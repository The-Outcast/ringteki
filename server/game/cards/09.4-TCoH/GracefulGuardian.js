const DrawCard = require('../../drawcard.js');
const AbilityDsl = require('../../abilitydsl');

const { Players } = require('../../Constants');

class GracefulGuardian extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Increase cost to play cards',
            condition: context => context.source.isParticipating(),
            effect: 'increase the cost of cards played by 1 for each player\'s next action opportunity',
            gameAction: AbilityDsl.actions.playerLastingEffect(context => ({
                targetController: Players.Any,
                effect: AbilityDsl.effects.increaseCost({
                    amount: 1
                }),
                until: {
                    onPassActionPhasePriority: event => event.player === context.player
                }
            }))
        });
    }
}

GracefulGuardian.id = 'graceful-guardian';

module.exports = GracefulGuardian;

