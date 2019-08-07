import { CardTypes } from '../../Constants.js';

const DrawCard = require('../../drawcard.js');
const { Locations } = require('../../Constants');
const AbilityDsl = require('../../abilitydsl.js');

class ShinjoGunso extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            title: 'Put a character into play',
            when: {
                onCardPlayed: (event, context) =>
                    event.card === context.source &&
                    [Locations.ProvinceOne, Locations.ProvinceTwo, Locations.ProvinceThree, Locations.ProvinceFour].includes(event.originalLocation)
            },
            effect: 'search the top 5 cards of their dynasty deck for a character that costs 2 or less and put it into play',
            gameAction: AbilityDsl.actions.sequential([
                AbilityDsl.actions.cardMenu(context => ({
                    activePromptTitle: 'Choose a character that costs 2 or less',
                    cards: context.player.dynastyDeck.first(5),
                    cardCondition: card => card.type === CardTypes.Character && card.printedCost <= 2,
                    choices: ['Don\'t choose a character'],
                    handlers: [() => {
                        this.game.addMessage('{0} chooses not to put a character into play', context.player);
                        return true;
                    }],
                    gameAction: AbilityDsl.actions.putIntoPlay()
                })),
                AbilityDsl.actions.moveCard((context) => ({
                    target: context.player.dynastyDeck.first(5).includes(card => card.uuid === context.source.uuid) 
                        ? context.player.dynastyDeck.first(5)
                        : context.player.dynastyDeck.first(4),
                    faceup: true,
                    destination: Locations.DynastyDiscardPile
                }))
            ])
        });
    }
}

ShinjoGunso.id = 'shinjo-gunso';

module.exports = ShinjoGunso;
