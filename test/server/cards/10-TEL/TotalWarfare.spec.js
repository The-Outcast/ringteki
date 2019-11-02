describe('Total Warfare', function() {
    integration(function() {
        beforeEach(function() {
            this.setupTest({
                phase: 'conflict',
                player1: {
                    inPlay: ['akodo-zentaro', 'matsu-berserker'],
                    hand: ['total-warfare']
                },
                player2: {
                    inPlay: ['samurai-of-integrity', 'akodo-toturi'],
                    provinces: ['ancestral-lands']
                }
            });

            this.zentaro = this.player1.findCardByName('akodo-zentaro');
            this.matsuBerseker = this.player1.findCardByName('matsu-berserker');
            this.totalWarfare = this.player1.findCardByName('total-warfare');

            this.samuraiOfIntegrity = this.player2.findCardByName('samurai-of-integrity');
            this.akodoToturi = this.player2.findCardByName('akodo-toturi');
            this.ancestralLands = this.player2.findCardByName('ancestral-lands', 'province 1');
        });

        it('should be able to played on a province', function() {
            this.player1.playAttachment(this.totalWarfare, this.ancestralLands);

            expect(this.totalWarfare.parent).toBe(this.ancestralLands);
        });

        it('should prompt the loser to sacrifice a character', function() {
            this.noMoreActions();

            this.initiateConflict({
                attackers: [this.zentaro, this.matsuBerseker],
                defenders: [this.akodoToturi, this.samuraiOfIntegrity],
                province: this.ancestralLands
            });

            this.player2.pass();
            this.player1.playAttachment(this.totalWarfare, this.ancestralLands);

            this.player2.pass();
            this.player1.pass();

            expect(this.player1).toHavePrompt('Choose a character');
            this.player1.clickCard(this.zentaro);
            expect(this.getChatLogs(3)).toContain('player1 uses Total Warfare to sacrifice Akodo Zentarō');
        });

        it('should be discard if played on a facedown province and that province is flipped', function() {
            this.player1.playAttachment(this.totalWarfare, this.ancestralLands);

            expect(this.totalWarfare.parent).toBe(this.ancestralLands);
            this.noMoreActions();

            this.initiateConflict({
                attackers: [this.zentaro, this.matsuBerseker],
                defenders: [this.akodoToturi, this.samuraiOfIntegrity],
                province: this.ancestralLands
            });

            expect(this.totalWarfare.location).toBe('conflict discard pile');
        });
    });
});
