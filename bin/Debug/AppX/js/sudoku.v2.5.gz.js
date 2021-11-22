var texts = {
    share: "Copy the link below to share the currently displayed board",
    exp: "This string represnt the board, with '0' as empty cell",
    imp: "Enter a string of 81 characters (blanks can be 0, or anything but a number)",
    import_invalid: "Your submission is invalid, please check again",
    board_invalid: "Invalid board: no single solution found",
    saveGame: "Game saved",
    loadGame: "Game loaded",
    newGame: "New game loaded",
    win: "You won! very impressive",
    loose: "Solution is not valid, please verify",
    pause: "Game paused",
    clear_cell: "Clear"
},
        options = {
            button: {
                levelMenu: $("div.output > ul"),
                undo: $("#sudokuAppBar > button.undo"),
                restart: $("#options > button.restart"),
                newGame: $("#options > button.new"),
                notes: $("#sudokuAppBar > button.notes"),
                note: $("#sudokuAppBar > button.note"),
                clearNotes: $("#sudokuAppBar > button.clearNotes"),
                save: $("#sudokuAppBar > button.save"),
                load: $("#sudokuAppBar > button.load"),
                Import: $("#sudokuAppBar > button.import"),
                Export: $("#sudokuAppBar > button.export"),
                share: $("#sudokuAppBar > button.share"),
                set: function (a, b) {
                    this[a].prop("disabled", b ? !1 : !0)
                }
            },
            bind_buttons: function () {
                var a = this;
                $("#options > button").prop("disabled", !1);
                this.button.undo.bind("click", a.undo);
                this.undoToggle();
                this.button.restart.bind("click", $.proxy(a, "restart"));
                this.button.newGame.bind("click", $.proxy(a, "newGame"));
                this.button.Import.bind("click", function () {
                    a.Import()
                });
                this.button.Export.bind("click", function () {
                    a.Export()
                });
                this.button.share.bind("click", $.proxy(a, "share"));
                this.button.notes.bind("click", function () {
                    a.candidates.set()
                });
                this.button.note.bind("click", function () {
                    a.notes.set()
                });
                this.button.clearNotes.bind("click", function () {
                    a.notes.remove()
                });
                utility.supports_html5_storage ? (this.button.save.bind("click", function () {
                    a.save()
                }), this.button.load.bind("click", function () {
                    a.load()
                }), localStorage && this.button.save.add(this.button.load).show(), (!localStorage || !localStorage["sudoku.arr"]) && this.button.load.prop("disabled", !0)) : this.button.save.add(this.button.load).hide();
                this.levelMenu()
            },
            levelMenu: function () {
                function a() {
                    
                    //$("html").unbind("click")
                }
                var b = this.button.levelMenu;
                b.find("li").filter(function () {
                    return $(this).text() == b.prev().text()
                }).addClass("on");
                b.prev().bind("click", function (c) {
                    c.stopPropagation();
                    b.animate({
                        opacity: "show",
                        top: "+=22"
                    }, 200);
                    $("html").bind("click", a)
                });
                b.delegate("li", "click", function (a) {
                    a.stopPropagation();
                    $(this).addClass("on").siblings(".on").removeClass("on");
                    board.level = this.innerHTML;
                    b.attr("style", "").prev().text(board.level);
                    board.loadGameByLevel(board.level)
                })
            },
            reset: function () {
                board.movesHistory.length = 0;
                this.candidates.remove();
                this.notes.remove();
                this.undoToggle();
                board.timer.restart()
            },
            undo: function () {
                board.changeCell();
                board.movesHistory.splice(-1);
                options.undoToggle()
            },
            undoToggle: function () {
                options.button.set("undo", 0 < board.movesHistory.length ? !0 : !1)
            },
            restart: function () {
                this.reset();
                board.arr = $.extend(!0, [], board.arr_original);
                board.cells.find("> div span:first").empty();
                board.numberOfMoves = utility.countEmtpyCells()
            },
            newGame: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel(board.level);
                var msg = new Windows.UI.Popups.MessageDialog(board.level);
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            newGame0: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel("easy");
                var msg = new Windows.UI.Popups.MessageDialog("Game Level : easy");
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            newGame1: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel("medium");
                var msg = new Windows.UI.Popups.MessageDialog("Game Level : medium");
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            newGame2: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel("tough");
                var msg = new Windows.UI.Popups.MessageDialog("Game Level : tough");
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            newGame3: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel("very tough");
                var msg = new Windows.UI.Popups.MessageDialog("Game Level : very tough");
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            newGame4: function () {
                window.location.search && (window.location.search = "");
                this.reset();
                options.button.set("newGame", 0);
                board.loadGameByLevel("extreme");
                var msg = new Windows.UI.Popups.MessageDialog("Game Level : extreme");
                utility.alert.say(texts.newGame + " (" + solver.score() + ")");
                board.spawnBoards(6);
                options.button.set("newGame", 1)
            },
            save: function () {
                localStorage["sudoku.arr"] = JSON.stringify(board.arr);
                localStorage["sudoku.arr_original"] = JSON.stringify(board.arr_original);
                localStorage["sudoku.movesHistory"] = JSON.stringify(board.movesHistory);
                localStorage["sudoku.score"] = board.level;
                localStorage["sudoku.time"] = board.timer.hour + ":" + board.timer.min + ":" + board.timer.sec;
                this.button.load.prop("disabled", !1);
                utility.alert.say(texts.saveGame)
            },
            load: function () {
                this.candidates.remove();
                this.notes.remove();
                this.undoToggle();
                board.arr = JSON.parse(localStorage["sudoku.arr"]);
                board.arr_original = JSON.parse(localStorage["sudoku.arr_original"]);
                board.movesHistory = JSON.parse(localStorage["sudoku.movesHistory"]);
                solver.setScore(localStorage["sudoku.score"]);
                var a;
                a = [];
                var b, c;
                for (b = 0; b < board.arr.length; b++) for (c = 0; c < board.arr[b].length; c++) board.arr[b][c] !== board.arr_original[b][c] && a.push([b, c]);
                a = a.sort();
                board.numberOfMoves = utility.countEmtpyCells();
                board.load({
                    arr: board.arr,
                    filledCells: a
                });
                board.timer.paused && board.timer.el.trigger("click");
                board.timer.set(localStorage["sudoku.time"]).go(!0);
                utility.alert.say(texts.loadGame)
            },
            share: function () {
                var a = window.location.host + "?" + utility.flattenBoard(board.arr_original).join("");
                prompt(texts.share, a)
            },
            Export: function () {
                var a = utility.flattenBoard(board.arr_original);
                prompt(texts.exp, a.join(""))
            },
            Import: function (a) {
                if (a = a || prompt(texts.imp)) if (81 != a.length) utility.alert.say(texts.import_invalid);
                else {
                    var b, c = "";
                    for (b = 0; 81 > b; b += 9) c += a.slice(b, b + 9), 70 > b && (c += ",");
                    c = c.split(",");
                    for (b = 9; b--;) {
                        c[b] = c[b].split("");
                        for (a = 9; a--;) c[b][a] = 0 == c[b][a] ? "" : c[b][a] | 0
                    }
                    b = c;
                    1 != dlx.solve($.extend(!0, [], b)) && utility.alert.shout(texts.board_invalid);
                    b = utility.transformArray(b);
                    this.reset();
                    board.load({
                        arr: b
                    });
                    board.numberOfMoves = utility.countEmtpyCells();
                    solver.init(b).step(0);
                    solver.setScore()
                }
            },
            notes: {
                possibilities: {},
                toggle: !1,
                set: function () {
                    this.toggle ? (this.toggle = !1, options.button.note.removeClass("on")) : (this.toggle = !0, options.candidates.toggle && options.candidates.set(), options.button.note.addClass("on"))
                },
                update: function (a, b) {
                    var c = this.possibilities;
                    if (a in c) {
                        var d = c[a].indexOf(b); -1 != d ? c[a].splice(d, 1) : c[a].push(b)
                    } else c[a] = [b];
                    c[a].sort()
                },
                check: function (a, b) {
                    a && (delete this.possibilities[b], board.cells.filter(function () {
                        return $(this).data("pos") == b
                    }).find("table.candidates td").empty(), this.possibilities = analyzer.evaluatePosib.apply(this, [board]), this.render())
                },
                render: function () {
                    var a = this.possibilities,
                                        b, c, d;
                    for (b in a) {
                        c = board.cells.not(".filled").filter(function () {
                            return $(this).data("pos") == b
                        });
                        d = c.find("table.candidates td").empty();
                        for (c = 0; 9 > c; c++) d.eq(a[b][c] - 1).html(a[b][c])
                    }
                },
                remove: function () {
                    board.cells.length && (this.possibilities = {}, options.candidates.toggle && options.candidates.set(), board.cells.find("table.candidates td").empty())
                }
            },
            candidates: {
                toggle: !1,
                set: function () {
                    this.toggle ? this.remove() : (options.button.notes.addClass("on"), options.notes.toggle && options.notes.set(), this.render())
                },
                render: function () {
                    var a, b, c, d;
                    this.toggle = !0;
                    a = analyzer.evaluateTotal(board);
                    board.cells.not(".filled").each(function () {
                        c = $(this).data("pos");
                        b = $(this).find("table.candidates td");
                        b.empty();
                        for (d = 0; 9 > d; d++) b.eq(a[c][d] - 1).text(a[c][d])
                    })
                },
                remove: function () {
                    board.cells.length && (options.button.notes.removeClass("on"), board.cells.each(function () {
                        $(this).find("table.candidates td").empty()
                    }), Object.keys(options.notes.possibilities).length && options.notes.render(), this.toggle = !1)
                }
            }
        },
        utility = {
            alert: {
                alertObj: $("<div/>").addClass("alert"),
                toggle: !1,
                timeout: null,
                value: null,
                say: function (a) {
                    function b() {
                        c.alertObj.text(a);
                        clearTimeout(c.timeout);
                        c.timeout = window.setTimeout(function () {
                            c.hide()
                        }, 1500)
                    }
                    if (a) {
                        var c = this;
                        this.toggle && (c.alertObj.text(a), b());
                        this.toggle = !0;
                        this.value = a;
                        b();
                        $("body").append(this.alertObj)
                    }
                },
                hide: function () {
                    var a = this;
                    this.toggle = !1;
                    this.alertObj.fadeOut(1E3, function () {
                        a.alertObj.remove().removeAttr("style")
                    })
                },
                shout: function (a) {
                    var b = this,
                                        c = $("<button/>").text("X");
                    c.bind("click", function () {
                        b.hide()
                    });
                    clearTimeout(this.timeout);
                    this.alertObj.text(a).addClass("shout").append(c);
                    $("body").append(this.alertObj)
                }
            },
            transformArray: function (a) {
                var b = [],
                                c, d, e, h, g;
                for (d = 0; 3 > d; d++) for (e = 0; 3 > e; e++) {
                    c = [];
                    for (h = 0; 3 > h; h++) for (g = 0; 3 > g; g++) c.push(a[h + 3 * d][g + 3 * e]);
                    b.push(c)
                }
                return b
            },
            flatten: function (a) {
                return a.reduce(function (a, c) {
                    return a.concat(c)
                })
            },
            flattenBoard: function (a) {
                for (var a = this.transformArray(a), a = this.flatten(a), b = a.length; b--;) a[b] || (a[b] = 0);
                return a
            },
            randomSort: function () {
                return 0 | 10 * Math.random() % 2
            },
            supports_html5_storage: function () {
                try {
                    return "localStorage" in window && null !== window.localStorage
                } catch (a) {
                    return !1
                }
            }(),
            generateNumber: function (a) {
                a = a || [9, 1];
                return Math.random() * a[0] + a[1] >> 0
            },
            countEmtpyCells: function (a) {
                a = a || board.arr;
                a = utility.flatten(a);
                return a.length - a.filter(Number).length
            }
        },
        board = {
            mainBoard: null,
            level: "easy",
            cells: {},
            arr: [],
            arr_original: [],
            movesHistory: [],
            boards: [],
            numberOfMoves: 0,
            numOfBoards: 0,
            boardsReadyTimeout: 0,
            domFragments: {
                userCell: '<div><div><span></span></div><button title="' + texts.clear_cell + '">x</button></div>'
            },
            init: function (a) {
                this.container = a;
                this.mainBoard = this.generateMainTable();
                this.timer = new Timer;
                this.timer.init($("<time>").appendTo(".time_ot").attr("title", "Click to pasue/play"));
                82 == window.location.search.length ? options.Import(window.location.search.split("?")[1], !0) : (this.games[this.level].sort(utility.randomSort), this.loadGameByLevel(this.level), this.spawnBoards(6));
                this.bindUserEvents();
                this.selectBox.init();
                options.bind_buttons();
                a.append(this.mainBoard)
            },
            spawnBoards: function (a) {
                a = a || 2;
                this.numOfBoards += a;
                var b = [],
                                c;
                for (c = this.populate() ; a--;) b[a] = new board.CreateGame, b[a].make({
                    arr: c
                })
            },
            generateMainTable: function () {
                var a = this,
                                b, c;
                b = this.makeTable();
                b.find("td").each(function (b) {
                    c = a.makeTable(b).addClass("box b" + b);
                    $(this).append(c)
                });
                return b
            },
            bindUserEvents: function () {
                var a = this,
                                b, c, d, e, h, g;
                $(a.mainBoard).on("click", "td.user", a.cellClick).on("click", "td.user button", a.clearCell).on("mouseenter", "td.user", function (a) {
                    b = $(a.currentTarget).data("pos")
                }).on("mouseleave", "td.user", function () {
                    b = null
                });
                $(document).bind("keyup", function (f) {
                    g = f.which;
                    c = 58 > g && 48 < g;
                    d = 106 > g && 96 < g;
                    e = 46 == g || 110 == g;
                    b && (a.selectBox.hide(), c || d ? (h = String.fromCharCode(96 <= g && 105 >= g ? g - 48 : g) | 0, options.notes.toggle ? a.changeNote(h, b) : a.changeCell(h, b)) : e && board.changeCell("", b), options.undoToggle())
                })
            },
            selectBox: function () {
                function a(a) {
                    var b = e.arr[a[0]][a[1]];
                    e.arr[a[0]][a[1]] = "";
                    e.selectBox.obj.find("td").each(function (b) {
                        this.innerHTML = b + 1;
                        this.className = e.checkNumber(b + 1, a) ? "" : "disabled"
                    });
                    e.arr[a[0]][a[1]] = b
                }
                function b() {
                    e.selectBox.obj.removeClass("show");
                    $(document).off("click.selectBox", d)
                }
                function c(a) {
                    var c = a.target.innerHTML | 0,
                                        a = $(a.target).parents("td.user").data("pos");
                    options.notes.toggle ? e.changeNote(c, a) : e.changeCell(c, a);
                    b()
                }
                function d(a) {
                    a = $(a.target);
                    if (a.hasClass("num_select") || a.parents("table").hasClass("num_select")) return !1;
                    b()
                }
                var e;
                return {
                    init: function () {
                        e = board;
                        this.obj = e.makeTable().addClass("num_select");
                        $(e.mainBoard).on("click", "table.num_select td:not(.disabled)", c)
                    },
                    show: function (b, c) {
                        a(c);
                        $(b).children("div").append(e.selectBox.obj);
                        setTimeout(function () {
                            e.selectBox.obj.toggleClass("show");
                            $(document).on("click.selectBox", d)
                        }, 1)
                    },
                    hide: b
                }
            }(),
            cellClick: function (a) {
                if (!$(a.target).closest("table").hasClass("num_select")) {
                    var b = board,
                                        a = a.currentTarget,
                                        c = $(a).data("pos");
                    b.selectBox.obj.is(":visible") && b.selectBox.hide(0);
                    b.selectBox.show(a, c)
                }
            },
            clearCell: function (a) {
                a.stopPropagation();
                a = $(a.target).closest("td.user").data("pos");
                board.changeCell("", a);
                options.undoToggle()
            },
            changeCell: function (a, b) {
                var c, d;
                arguments.length ? this.movesHistory.push([b, this.arr[b[0]][b[1]]]) : (b = this.movesHistory.slice(-1)[0][0], a = this.movesHistory.slice(-1)[0][1]);
                c = this.arr[b[0]][b[1]];
                this.arr[b[0]][b[1]] = a;
                d = board.cells.filter(function () {
                    return $(this).data("pos") == b
                });
                a && d.find("> div span").text(a);
                a ? d.addClass("filled") : d.removeClass("filled");
                options.undoToggle();
                this.checkWin(c, a);
                options.notes.check(a, b);
                options.candidates.toggle && options.candidates.render()
            },
            checkWin: function (a, b) {
                a ? b || board.numberOfMoves++ : b && board.numberOfMoves--;
                if (board.numberOfMoves) return !1;
                for (var c = utility.flattenBoard(this.arr).join(""), d = 1; 9 >= d; d++) if (9 > c.split(d).length - 1) return utility.alert.say(texts.loose), !1;
                board.endGame()
            },
            changeNote: function (a, b) {
                var c, d;
                c = board.cells.filter(function () {
                    return $(this).data("pos") == b
                });
                d = c.find("table.candidates td").eq(a - 1);
                c.removeClass("filled").find("> div span:first").text("");
                board.arr[b[0]][b[1]] = "";
                a = d.is(":empty") ? a : "";
                d.html(a);
                options.notes.update(b, a)
            },
            makeTable: function (a) {
                var b = $("<table/>");
                b.attr("cellpadding", 0).attr("cellspacing", 0);
                for (var c = 0; 3 > c; c++) for (var d = $("<tr/>").appendTo(b), e = 0; 3 > e; e++) {
                    var h = $("<td/>");
                    a + 1 && h.data("pos", a + "" + (3 * c + e));
                    d.append(h)
                }
                return b
            },
            populate: function () {
                for (var a = 0, b = [4, 9], c = []; 9 > c.push([]) ;);
                result = {
                    arr: c
                };
                testArr = [];
                for (c = 0; 9 > c; c++) {
                    for (var d = 0; 9 > d; d++) {
                        a++;
                        b[1] = 9;
                        testArr.length = 0;
                        for (var e = utility.generateNumber() ; !this.checkNumber.apply(result, [e, [c, d], !0]) && b[1];) {
                            a++;
                            if (5E4 < a) return; -1 != testArr.indexOf(e) ? e = utility.generateNumber() : (testArr.push(e), e = utility.generateNumber(), b[1]--)
                        }
                        if (!b[1]) {
                            b[0]--;
                            result.arr[c].length = 0;
                            c = !b[0] ? c - 2 : c - 1;
                            break
                        }
                        9 == d && (b[0] = 4);
                        result.arr[c][d] = e
                    }
                    b[0] || (b[0] = 4)
                }
                return result.arr
            },
            checkNumber: function (a, b, c) {
                var d = this,
                                e;
                e = {
                    square: function (b) {
                        return -1 != d.arr[b].join("").indexOf(a)
                    },
                    row: function (b) {
                        if (0 == Math.ceil(b[0] % 3) && c) return !1;
                        var e, f;
                        e = Math.ceil(((b[0] | 0) + 1) / 3) - 1;
                        subRow = Math.ceil(((b[1] | 0) + 1) / 3) - 1;
                        for (b = 0; 3 > b; b++) for (f = 0; 3 > f; f++) if (a == d.arr[3 * e + b][3 * subRow + f]) return !0;
                        return !1
                    },
                    col: function (b) {
                        if (3 > b[0] && c) return !1;
                        var e, f, i;
                        e = Math.ceil((b[0] | 0) % 3);
                        b = Math.ceil((b[1] | 0) % 3);
                        for (f = 0; 3 > f; f++) for (i = 0; 3 > i; i++) if (a == d.arr[e + 3 * f][b + 3 * i]) return !0;
                        return !1
                    }
                };
                return -1 != d.arr[b[0] | 0].join("").indexOf(a) || e.row(b) || e.col(b) ? !1 : !0
            },
            removeItems: function (a) {
                var a = a || {
                    cells: 0
                },
                                b = a.arr || this.arr,
                                c = [];
                do c[0] = utility.generateNumber() - 1, c[1] = utility.generateNumber() - 1;
                while ("" == b[c[0]][c[1]]);
                var d = [c, b[c[0]][c[1]], b[8 - c[0]][8 - c[1]]];
                b[c[0]][c[1]] = "";
                b[8 - c[0]][8 - c[1]] = "";
                1 < a.cells && this.removeItems({
                    cells: --a.cells,
                    arr: b
                });
                return d
            },
            load: function (a) {
                a = a || {};
                this.arr = a.arr ? $.extend(!0, [], a.arr) : this.arr;
                this.arr_original = $.extend(!0, [], this.arr);
                for (var a = a.filledCells || [], b = this.mainBoard.find("table.box"), c, d = 0, e = this.arr.length; d < e; d++) for (var h = b.eq(d), g = 0; g < e; g++) {
                    var f = h.find("> tbody > tr > td").eq(g);
                    f.html(board.arr[d][g]).removeAttr("class");
                    c = board.arr[d][g];
                    if ("" == c || 0 != a.length && d + "" + g == a[0].join("")) {
                        var i = board.makeTable().addClass("candidates");
                        f.addClass("user").html(board.domFragments.userCell).children("div").append(i);
                        "" != c && (f.addClass("filled").find("> div span:first").html(c), a.splice(0, 1))
                    }
                }
                board.cells = b.find("td.user")
            },
            loadGameByLevel: function (a) {
                var b = this.games[a].pop();
                this.games[a].unshift(b);
                options.Import(b);
                this.spawnBoards(4)
            },
            endGame: function () {
                var msg = new Windows.UI.Popups.MessageDialog("END GAME");
                msg.showAsync();
                function a() {
                    c += 0.1;
                    d = utility.generateNumber([80, 0]);
                    b.eq(d).css("backgroundColor", "rgba(190, 190, 190,.24)").stop().delay(100).animate({
                        backgroundColor: "rgba(190, 190, 190,0)"
                    }, 200);
                    e = setTimeout(a, c | 0)
                }
                var b, c, d, e;
                this.timer.stop();
                utility.alert.shout(texts.win);
                b = $("table.box > tbody > tr > td");
                c = 0;
                a();
                $("#options > button").prop("disabled", !0);
                setTimeout(function () {
                    clearTimeout(e);
                    $("#options > button").prop("disabled", !1)
                }, 5E3)
            },
            CreateGame: function () {
                this.make = function (a) {
                    function b() {
                        a.arr = d;
                        h++;
                        if (2 == e) {
                            i--;
                            var b = d;
                            b[j[0][0]][j[0][1]] = j[1];
                            b[8 - j[0][0]][8 - j[0][1]] = j[2];
                            i ? f() : board.initCreatedGame(a)
                        } else 81 < h ? (console.warn("verifySolution: too much recursion"), board.initCreatedGame(a)) : f()
                    }
                    if (!a || !a.arr || !a.arr.length) console.warn("CreateGame: invalid options argument");
                    else {
                        a.callback = a.callback || {};
                        var c = [],
                                                d = $.extend(!0, [], a.arr),
                                                e, h = 0,
                                                g, f, i = 16,
                                                j;
                        board.removeItems({
                            cells: 8,
                            arr: d
                        });
                        window.Worker ? (g = new Worker("js/DLX.js"), f = function () {
                            j = board.removeItems({
                                arr: d
                            });
                            c = utility.transformArray(d);
                            g.postMessage(c)
                        }, g.addEventListener("message", function (a) {
                            e = a.data;
                            b()
                        }, !1)) : f = function () {
                            j = board.removeItems({
                                arr: d
                            });
                            c = utility.transformArray(d);
                            e = dlx.solve(c);
                            b()
                        };
                        f()
                    }
                }
            },
            initCreatedGame: function (a) {
                this.numOfBoards--;
                var b = a.arr;
                45 > utility.countEmtpyCells(b) ? (console.warn("generated board has too few moves. make a new game"), !this.numOfBoards && !this.boards.length && this.spawnBoards(2)) : (solver.init(b).step(0), this.boards.push([solver.grade, b]), this.addBoards(b), 1 == this.boards.length && 9 > this.arr.length && this.preloadBoard(a.callback))
            },
            preloadBoard: function (a) {
                var b = this;
                if (this.boards.length) {
                    var c = this.boards[0];
                    this.numberOfMoves = utility.countEmtpyCells(c[1]);
                    this.load({
                        arr: c[1]
                    });
                    solver.grade = c[0];
                    solver.setScore();
                    this.boards.splice(0, 1);
                    this.timer.go();
                    4 > this.numOfBoards && 4 > this.boards.length && this.spawnBoards(8);
                    a && "function" === typeof a && a()
                } else this.boardsReadyTimeout = setTimeout(function () {
                    b.preloadBoard(a)
                }, 150)
            },
            addBoards: function (a) {
                var b = solver.score();
                15 > this.games[b].length && (a = utility.flattenBoard(a).join(""), this.games[b].push(a))
            }
        },
        solver = {
            init: function (a) {
                this.grade = this.steps = this.singles = 0;
                this.arr = a ? $.extend(!0, [], a) : $.extend(!0, [], board.arr);
                this.numberOfMoves = utility.countEmtpyCells(a);
                analyzer.evaluateTotal(solver);
                return this
            },
            step: function (a) {
                var b = 0;
                switch (a) {
                    case 0:
                        analyzer.evaluatePosib();
                        break;
                    case 1:
                        analyzer.singleInBox();
                        break;
                    case 2:
                        analyzer.singleInRowCol();
                        break;
                    case 3:
                        b += analyzer.nakedPairsTriples();
                        break;
                    case 4:
                        b += analyzer.hiddenPairsTriples();
                        break;
                    default:
                        return !1
                }
                this.makeSingleMoves();
                this.grade += 10;
                2 == a && (this.grade += 10 * this.singles);
                3 < a && b && (this.grade += 10 * b);
                if (4 == a && !b || 0 == this.numberOfMoves) return this.grade += 30 * this.numberOfMoves, !1;
                150 < this.steps || (a = 0 < this.singles || 0 < b ? 0 : a + 1, this.step(a))
            },
            makeSingleMoves: function () {
                this.steps++;
                this.singles = 0;
                var a = analyzer.possibilities,
                                b;
                for (b in a) a.hasOwnProperty(b) && 1 === a[b].length && (this.singles++, this.numberOfMoves--, this.advance(b, a[b][0]), delete a[b])
            },
            advance: function (a, b) {
                this.arr[a[0]][a[1]] = b
            },
            score: function () {
                var a = "very easy";
                1400 < this.grade ? a = "extreme" : 1200 < this.grade ? a = "very tough" : 900 < this.grade ? a = "tough" : 350 < this.grade ? a = "medium" : 150 < this.grade && (a = "easy");
                return a
            },
            setScore: function (a) {
                a = a || this.score();
                $("div.output:first > span").text(a).attr({
                    "data-value": solver.grade,
                    title: "more or less"
                })
            }
        },
        analyzer = {
            possibilities: {},
            evaluateTotal: function (a) {
                var b = this.possibilities = {},
                                c, d, e;
                for (c = 0; 9 > c; c++) for (d = 0; 9 > d; d++) if ("" == a.arr[c][d]) {
                    b[c + "" + d] = [];
                    for (e = 1; 10 > e; e++) board.checkNumber.apply(a, [e, [c, d]]) && b[c + "" + d].push(e)
                }
                return b
            },
            evaluatePosib: function (a) {
                var b = this.possibilities,
                                c, d, e, a = a || solver;
                for (c in b) for (d = b[c].length; d--;) !1 === board.checkNumber.apply(a, [b[c][d],
                                [c[0] | 0, c[1] | 0]
                ]) && (e = b[c].indexOf(b[c][d]), b[c].splice(e, 1));
                return b
            },
            singleInBox: function () {
                var a = this.possibilities,
                                b = Object.keys(a)[0][0],
                                c = this.boxPosib = [{}],
                                d;
                for (d in a) d[0] != b && (b = d[0], c.push({})), c[c.length - 1][d] = a[d];
                for (a = c.length; a--;) this.hiddenSingles(c[a])
            },
            singleInRowCol: function () {
                for (var a = this.possibilities, b = this.colPosib = [], c = this.rowPosib = [], d = 9; d--;) b.push({}), c.push({});
                for (var e in a) {
                    var d = 3 * Math.ceil(e[0] % 3) + Math.ceil(e[1] % 3),
                                        h = 3 * (Math.ceil(((e[0] | 0) + 1) / 3) - 1) + (Math.ceil(((e[1] | 0) + 1) / 3) - 1);
                    b[d][e] = a[e];
                    c[h][e] = a[e]
                }
                for (d = 0; 9 > d; d++) this.hiddenSingles(b[d]), this.hiddenSingles(c[d])
            },
            hiddenSingles: function (a) {
                var b = "",
                                c;
                for (c in a) b += a[c].join("");
                for (c in a) for (var d = a[c].length; d--;) {
                    var e = a[c][d];
                    if (b.indexOf(e) == b.lastIndexOf(e)) {
                        this.possibilities[c] = [e];
                        break
                    }
                }
            },
            nakedPairsTriples: function () {
                for (var a = 0, b = 9; b--;) a += this.findNakedPairs(this.rowPosib[b]) + this.findNakedPairs(this.colPosib[b]) + this.findNakedPairs(this.boxPosib[b]) + this.findNakedTriples(this.rowPosib[b]) + this.findNakedTriples(this.colPosib[b]) + this.findNakedTriples(this.boxPosib[b]);
                return a
            },
            hiddenPairsTriples: function () {
                for (var a = 0, b = 9; b--;) a += this.findHiddenPairsTriples(this.rowPosib[b]) + this.findHiddenPairsTriples(this.colPosib[b]) + this.findHiddenPairsTriples(this.boxPosib[b]);
                return a
            },
            findNakedPairs: function (a) {
                if ("object" != typeof a || 3 > Object.keys(a).length) return 0;
                var b = [],
                                c = 0,
                                d;
                for (d in a) 2 == a[d].length && b.push(d);
                d = b.length;
                for (var e = 0; e < d; e++) for (var h = e + 1; h < d; h++) if (2 == a[b[e]].length && a[b[e]].join("") == a[b[h]].join("")) {
                    var g = a[b[e]].join(""),
                                        f;
                    for (f in a) if (f != b[e] && f != b[h]) for (var i = a[f].length; i--;) -1 != g.indexOf(a[f][i]) && (c++, this.possibilities[f].splice(i, 1))
                }
                return c
            },
            findNakedTriples: function (a) {
                if ("object" != typeof a || 4 > Object.keys(a).length) return 0;
                var b = [],
                                c = 0,
                                d;
                for (d in a) 4 > a[d].length && b.push(d);
                d = [];
                for (var e = b.length, h = 0; h < e; h++) for (var g = h + 1; g < e; g++) for (var f = g + 1; f < e; f++) {
                    d.push(b[h], b[g], b[f]);
                    for (var i = "", j = d.length; j--;) for (var k = a[d[j]].length; k--;) {
                        var l = a[d[j]][k]; -1 == i.indexOf(l) && (i += l)
                    }
                    if (3 == i.length) for (j in a) if (-1 == d.indexOf(j)) for (k = a[j].length; k--;) -1 != i.indexOf(a[j][k]) && (c++, this.possibilities[j].splice(k, 1));
                    d.length = 0
                }
                return c
            },
            findHiddenPairsTriples: function (a) {
                function b(a, b) {
                    for (var e = a.length; e--;) c.possibilities[d[a[e]]] = $.extend(!0, [], b)
                }
                var c = this,
                                d = [],
                                e = "",
                                h = [],
                                g = 0,
                                f;
                for (f in a) d.push(f), e += a[f].join("");
                for (f = 0; f < d.length; f++) for (var i = f + 1; i < d.length; i++) {
                    for (var j = h.length = 0; j < a[d[f]].length; j++) {
                        var k = a[d[f]][j];
                        4 < a[d[f]].length + a[d[i]].length && 3 == e.split(k).length && -1 != a[d[i]].indexOf(k) && h.push(k);
                        if (2 == h.length) {
                            g++;
                            b([f, i], h);
                            break
                        }
                    }
                    for (var l = i + 1; l < d.length; l++) for (j = h.length = 0; j < a[d[f]].length; j++) if (k = a[d[f]][j], 9 < a[d[f]].length + a[d[i]].length + a[d[l]].length && 4 == e.split(k).length && -1 != a[d[i]].indexOf(k) && -1 != a[d[l]].indexOf(k) && h.push(k), 3 == h.length) {
                        g++;
                        b([f, i, l], h);
                        break
                    }
                }
                return g
            }
        },
        Timer = function () { };
Timer.prototype = {
    refresh: null,
    focus: null,
    sec: 0,
    min: 0,
    hour: 0,
    paused: !1,
    init: function (a) {
        this.el = a;
        this.clickEvent();
        return this
    },
    set: function (a) {
        a = a.split(":");
        this.hour = a[0];
        this.min = a[1];
        this.sec = a[2];
        return this
    },
    bindFocus: function () {
        var a = this;
        clearInterval(this.focus);
        document.hasFocus && (a.focus = setInterval(function () {
            document.hasFocus() ? a.paused && (window.clearInterval(this.refresh), a.go()) : a.stop()
        }, 200))
    },
    clickEvent: function () {
        var a = this,
                        b = $("<h2>").addClass("pauseGame").text(texts.pause),
                        c = !0;
        this.el.bind("click", function () {
            c && (c = !1, !1 === a.paused ? (a.stop(), window.clearInterval(a.focus), $("#options > button").prop("disabled", !0), board.mainBoard.fadeOut(400, function () {
                b.css({
                    letterSpacing: "25px",
                    opacity: 0
                });
                $(this).after(b).detach();
                b.parent().addClass("paused");
                b.animate({
                    opacity: 1
                }, {
                    queue: !1,
                    duration: 400
                }).animate({
                    letterSpacing: "-4px"
                }, 700, "easeOutBack", function () {
                    c = !0
                })
            }), a.el.addClass("pause")) : ($("#options > button").prop("disabled", !1), options.undoToggle(), b.animate({
                opacity: 0,
                letterSpacing: "25px"
            }, 600, "easeInBack", function () {
                $(this).parent().removeClass("paused").end().remove();
                board.container.prepend(board.mainBoard).removeAttr("style");
                board.mainBoard.fadeIn(400);
                a.go();
                c = !0
            }), this.className = ""))
        })
    },
    restart: function () {
        this.sec = this.min = this.hour = 0;
        this.el.text("00:00");
        this.stop().go()
    },
    go: function (a) {
        function b() {
            c.sec++;
            60 == c.sec && (c.sec = 0, c.min++);
            10 > c.sec && (c.sec = "0" + c.sec);
            60 == c.min && (c.min = 0, c.hour++);
            c.el.html((0 < c.hour ? (9 >= c.hour ? "0" + c.hour : c.hour) + ":" : "") + (9 >= c.min ? "0" + c.min : c.min) + ":" + c.sec)
        }
        var c = this;
        this.paused = !1;
        a && b();
        window.clearInterval(this.refresh);
        c.refresh = window.setInterval(b, 1E3);
        return this
    },
    stop: function () {
        this.paused = !0;
        window.clearInterval(this.refresh);
        return this
    }
};

function btn(form) {
    var value = form.sbox.value;
    var index = form.sbox.selectedIndex;
    var setext = form.sbox.options[form.sbox.selectedIndex].text;

    options.newGame1();
};