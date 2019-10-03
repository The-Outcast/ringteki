describe('Kitsuki Kagi', function() {
    integration(function() {
        beforeEach(function() {
            this.setupTest({
                phase: 'conflict',
                player1: {
                    inPlay: ['kitsuki-kagi'],
                    dynastyDiscard: ['mirumoto-raitsugu', 'imperial-storehouse'],
                    conflictDiscard: ['let-go', 'mirumoto-s-fury']
                },
                player2: {
                    dynastyDiscard: ['akodo-toturi', 'ikoma-ikehata'],
                    conflictDiscard: ['ikoma-reservist', 'ready-for-battle']
                }
            });

            this.kitsukiKagi = this.player1.findCardByName('kitsuki-kagi');
            this.raitsugu = this.player1.findCardByName('mirumoto-raitsugu');
            this.imperialStorehouse = this.player1.findCardByName('imperial-storehouse');
            this.imperialStorehouse = this.player1.findCardByName('imperial-storehouse');
            this.letGo = this.player1.findCardByName('let-go');
            this.fury = this.player1.findCardByName('mirumoto-s-fury');


            this.noMoreActions();
            this.initiateConflict({
                attackers: [this.kitsukiKagi],
                defenders: []
            });
        });

        it('should not bow as a result of conflict resolution if player has two other bushi attacking', function() {
            this.player2.pass();
            this.player1.pass();

            expect(this.player1).toHavePrompt('Triggered Abilities');
            expect(this.player1).toBeAbleToSelect(this.kitsukiKagi);

            this.player1.clickCard(this.kitsukiKagi);

            expect(this.player1).toHavePrompt('Choose up to 3 cards');
        });
    });
});
