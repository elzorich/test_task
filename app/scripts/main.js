(function ($) {

    (function () {

//Dropdown

        $('.dropdown').on('click', function () {
            var $this = $(this);
            $this.next('.sub-menu').slideToggle(200);
            $this.hide();
        });

//Selecting items from dropdown

        $('.nav__link').on('click', function () {
            var $this = $(this);
            var selected = $this.text();
            $this.closest('.nav__list').hide();
            $('.dropdown').css('display', 'block');
            $('.nav__selected').text(selected);
        });

    })();


//Tabs

    (function () {

        var $tabContents = $('.tab__content');

        $('#tabList').on('click', function (e) {
            e.preventDefault();
            var $target = $(e.target);
            var $parent = $target.parent();

            if ($target.hasClass('tab__link') && !$parent.hasClass('active')) {
                $parent.addClass('active').siblings().removeClass('active');

                var chosenContent = $target.attr("href");
                $tabContents.not(chosenContent).css("display", "none");
                $(chosenContent).fadeIn(1000);
            }
        });
    })();


//Get checked items from LocalStorage


    (function () {

        var initCheckboxes = function () {

            for (var i = 1; i < 101; ++i) {
                var check = $("<div class='check__wrap'>" +
                    "<input type='checkbox' value=" + [i] + " class='chk' id=checkboxId" + [i] + ">" +
                    "<label for=checkboxId" + [i] + ">" + "Опция " + [i] + "</label>" +
                    "</div>"
                );
                check.appendTo('.checkbox__wrap');
            }
        };

        initCheckboxes();
        /**
         * Store value in localStorage
         * @param {string} key
         * @param {object} data
         */
        var saveData = function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        };

        /**
         * Get value from localStorage
         * @param {string} key
         */
        var retrieveData = function (key) {
            return JSON.parse(localStorage.getItem(key));
        };

        /**
         * return jQuery element of checkbox by id from DOM
         * @param checkboxId
         * @returns {*|HTMLElement}
         */
        var $checkbox = function (checkboxId) {

            return $('#' + checkboxId);
        };

        var favorites = retrieveData('saveChecked') || [];

        favorites.forEach(function (value) {
            $checkbox(value).prop('checked', true);
        });

        $(".checkbox__wrap").on('click', function (e) {
            var $target = $(e.target);

            if ($target.hasClass('chk')) {
                var id = $target.attr('id');
                if ($target.prop('checked')) {
                    favorites.push(id);
                } else {
                    var index = favorites.indexOf(id);
                    if (index > -1) {
                        favorites.splice(index, 1);
                    }
                }

                if (favorites.length > 3) {
                    var lostValue = favorites.shift();
                    $checkbox(lostValue).prop('checked', false);
                }
                saveData('saveChecked', favorites);
            }
        });
    })();

})(jQuery);