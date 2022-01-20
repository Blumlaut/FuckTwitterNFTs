// ==UserScript==
// @name         FuckTwitterNFTs
// @namespace    http://tampermonkey.net/
// @description  FuckTwitterNFTs - Automatically hide NFT Users in twitter Timeline
// @author       Blumlaut
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @version      1.0.0
// @updateURL https://raw.githubusercontent.com/Blumlaut/FuckTwitterNFTs/main/FTNFTs.user.js
// @downloadURL https://raw.githubusercontent.com/Blumlaut/FuckTwitterNFTs/main/FTNFTs.user.js
// ==/UserScript==


function WaitUntilFound(parent, query) {
    var found = parent.querySelector(query)
    if (found) {
        return found
    } else {
        SetTimeout( function() {
            WaitUntilFound(parent,query)
        }, 10)
    }
}

(async function() {

    var BlockingMode = 0; // 0 = Hide Tweets Only, 1 = Actively Block (might have false positives!)

    async function RemoveNFTUsers() {
        var tweets = document.querySelectorAll('[role="article"]')

        // searches tweets for NFT Avatars and delets those tweets from TL.
        tweets.forEach(tweet => {
            var NFTard = tweet.querySelector('[style*="hex-hw-shapeclip-clipconfig"]')


            if (NFTard) {

                console.log("Found NFT Avatar..")

                if (BlockingMode == 1) {
                    var isQuoteTweet = false

                    var tempParent = NFTard.parentElement
                    for (var i = 0; i < 16; i++) {
                        if (!tempParent.attributes.role) {
                            tempParent = tempParent.parentElement
                        } else if (tempParent.attributes.role.value == "link") {
                            isQuoteTweet = true
                        }

                    }

                    var moreButton = tweet.querySelector('[aria-label="More"]')
                    if ((moreButton) && (!isQuoteTweet)) {
                        console.log("This is an actual tweet, blocking user.")
                        moreButton.click()
                        var blockButton = WaitUntilFound(document,'[data-testid="block"]')
                        if (blockButton) {
                            blockButton.click()
                            var blockConfirmButton = WaitUntilFound(document,'[data-testid="confirmationSheetConfirm"]')
                            if (blockConfirmButton) {
                                blockConfirmButton.click()
                            }
                        }

                    }

                } else if (BlockingMode == 0) {
                    tweet.remove();
                }

            }
        })


        // this searches "Who to Follow" for NFT Avatars and deletes the recommendation, currently causes a blank space.
        var UserCells = document.querySelectorAll('[data-testid="UserCell"]')
        UserCells.forEach(user => {
            var NFTard = user.querySelector('[style*="hex-hw-shapeclip-clipconfig"]')
            if (NFTard) {
                console.log("Found NFT Avatar in UserCell, Deleting..")
                user.remove();
            }
        })





        setTimeout(RemoveNFTUsers, 100)

    }
    setTimeout(RemoveNFTUsers, 100)

})();
