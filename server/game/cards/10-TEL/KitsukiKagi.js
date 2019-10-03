import { TargetModes, Locations, Players } from '../../Constants.js';

const DrawCard = require('../../drawcard.js');
const AbilityDsl = require('../../abilitydsl');

class KitsukiKagi extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            title: 'Remove 3 cards from discard',
            when: {
                afterConflict: (event, context) => event.conflict.winner === context.player
                    && context.source.isParticipating()
            },
            target: {
                mode: TargetModes.UpTo,
                numCards: 3,
                activePromptTitle: 'Choose up to 3 cards',
                location: [Locations.ConflictDiscardPile, Locations.DynastyDiscardPile],
                controller: Players.Any,
                gameAction: AbilityDsl.actions.removeFromGame()
            },
            effect: "remove {0} from play."
        });
    }
}

KitsukiKagi.id = 'kitsuki-kagi';

module.exports = KitsukiKagi;
