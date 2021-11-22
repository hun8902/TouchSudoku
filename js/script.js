//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/default.html", {
        ready: function (element, options) {
            var a = this;
            scenario4AddSettingsFlyout();
            document.getElementById("save").addEventListener("click", doClickSave, false);
            document.getElementById("load").addEventListener("click", doClickLoad, false);
            document.getElementById("new").addEventListener("click", doClickNew, false);
            document.getElementById("notes").addEventListener("click", doClickNotes, false);
            document.getElementById("reset").addEventListener("click", doClickReset, false);
            document.getElementById("Easy").addEventListener("click", doClicklv1, false);
            document.getElementById("medium").addEventListener("click", doClicklv2, false);
            document.getElementById("tough").addEventListener("click", doClicklv3, false);
            document.getElementById("verytough").addEventListener("click", doClicklv4, false);
            document.getElementById("extreme").addEventListener("click", doClicklv5, false);
            WinJS.log && WinJS.log("To show the bar, swipe up from the bottom of the screen, right-click, or press Windows Logo + z. To dismiss the bar, tap in the application, swipe, right-click, or press Windows Logo + z again.", "sample", "status");
        },
        unload: function () {
            AppBarSampleUtils.removeAppBars();
        }
    });


    
    // Command button functions


    function doClicklv1() {
       options.newGame0();
    }
    function doClicklv2() {
        options.newGame1();
    }
    function doClicklv3() {
        options.newGame2();
    }
    function doClicklv4() {
        options.newGame3();
    }
    function doClicklv5() {
        options.newGame4();
    }

    function doClickSave() {
        options.save();
        var msg = new Windows.UI.Popups.MessageDialog("Game Save");
        msg.showAsync();
    }

    function doClickLoad() {
        options.load();
        var msg = new Windows.UI.Popups.MessageDialog("Game load.");
        msg.showAsync();
    }

    function doClickNotes() {
        options.candidates.set();
    }

    function doClickclearNotes() {
        options.notes.remove();
    }

    function doClickReset() {
        options.reset();
        board.arr = $.extend(!0, [], board.arr_original);
        board.cells.find("> div span:first").empty();
        board.numberOfMoves = utility.countEmtpyCells();
    }

    function doClickNew() {
        options.newGame();
        var msg = new Windows.UI.Popups.MessageDialog("NewGame Start");
        msg.showAsync();
    }

    function scenario4AddSettingsFlyout() {
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = { "settingsDiv": { title: "Sudoku Options", href: "/html/help.html" } };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
        // Make sure the following is called after the DOM has initialized. Typically this would be part of app initialization
        WinJS.Application.start();


    }
})();
