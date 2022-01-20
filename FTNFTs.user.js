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

(function() {
    'use strict';


    function RemoveNFTUsers() {
        var tweets = document.querySelectorAll('[role="article"]')

        // searches tweets for NFT Avatars and delets those tweets from TL.
        tweets.forEach(tweet => {
            var NFTard = tweet.querySelector('[style*="hex-hw-shapeclip-clipconfig"]')
            if (NFTard) {
                console.log("Found NFT Avatar, Deleting..")
                tweet.remove();
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
