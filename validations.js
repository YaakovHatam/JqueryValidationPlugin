(function ($) {
    $.fn.validations = function (settings, errors, styles) {
        var res = true;

        // ------------- definitions ------------- //
        var _settings = $.extend({
            // These are the defaults.
            Required: true,
            MinLength: 4,
            MaxLength: 50,
            SpecialCharecters: false,
            OnlyNumbers: false,
            OnlyNumbersRangeMin: 0,
            OnlyNumbersRangeMax: 999999999
        }, settings);

        var _errors = $.extend({
            RequiredLabel: "שדה חובה",
            OnlyNumbersLabel: "מספרים בלבד",
            MinLengthLabel: "מינימום " + _settings.MinLength.toString() + " תוים",
            MaxLengthLabel: "מקסימום " + _settings.MinLength.toString() + " תוים",
            OnlyNumbersRangeMinLabel: "טווח מספרים מ: " + _settings.OnlyNumbersRangeMin.toString(),
            OnlyNumbersRangeMaxLabel: "טווח מספרים עד: " + _settings.OnlyNumbersRangeMax.toString()
        }, errors);

        var _styles = $.extend({
            background: "none repeat scroll 0 0 #FF3111",
            border: "1px solid #FF0000"
        }, styles);
        // ------------- end of definitions ------------- //

        var tempForReturn;
        $.each($(this), function (index, value) {
            tempForReturn = MakeValidations(this);
            if (!tempForReturn) {
                res = false;
            }
        });




        // ------------- validations ------------- //
        function MakeValidations(thisObject) {
            var ValidationResult = true;
            var ErrorsMessages = [];

            //is required field?
            if (_settings.Required) {
                if ($(thisObject).val().length == 0) {
                    ErrorsMessages.push(_errors.RequiredLabel);
                }

            }

            //minimum length
            if ($(thisObject).val().length < _settings.MinLength) {
                ErrorsMessages.push(_errors.MinLengthLabel);
            }

            //maximun length
            if ($(thisObject).val().length > _settings.MaxLength) {
                ErrorsMessages.push(_errors.MaxLengthLabel);
            }

            //if only numbers
            if (_settings.OnlyNumbers) {
                if (jQuery.isNumeric($(thisObject).val()) == false) {
                    ErrorsMessages.push(_errors.OnlyNumbersLabel);
                }

                //min range
                if (($(thisObject).val() < _settings.OnlyNumbersRangeMin)) {
                    ErrorsMessages.push(_errors.OnlyNumbersRangeMinLabel);
                }

                //max range
                if (($(thisObject).val() > _settings.OnlyNumbersRangeMax)) {
                    ErrorsMessages.push(_errors.OnlyNumbersRangeMaxLabel);
                }
            }
            if (ErrorsMessages.length > 0) {
                ValidationResult = errorMarkup(thisObject, ErrorsMessages);
            }
            return ValidationResult;
        }
        // ------------- end of validations ------------- //



        // ------------- other functions ------------- //

        function errorMarkup(thisObject, _ErrorsMessages) {
            $(thisObject).css("border", _styles.border);

            var position = $(thisObject).offset();

            position.right = ($(document).width() - ($(thisObject).offset().left + $(thisObject).outerWidth()));
            //position.left = position.left; // +80;
            position.top = position.top - 40 - ((_ErrorsMessages.length - 1) * 10);

            var divToAdd = "<div id='errorMsgsFromValidationPlugion" + thisObject.id + "' class='lastnameformError parentFormformID formError' onclick='$(this).remove();' style='opacity: 0.87; position: absolute;'><div class='formErrorContent'>";
            //var divToAdd = "<div id='errorMsgsFromValidationPlugion" + thisObject.id + "' class='lastnameformError parentFormformID formError' onclick='$(this).remove();' style='opacity: 0.87; position: absolute; top:" + top + "px; left: " + left + "px; margin-top: -40px;'><div class='formErrorContent'>";

            $.each(_ErrorsMessages, function (index, value) {
                divToAdd += (value + "<br />");
            });

            divToAdd += "</div><div class='formErrorArrow'><div class='line10'><!-- --></div><div class='line9'><!-- --></div><div class='line8'><!-- --></div><div class='line7'><!-- --></div><div class='line6'><!-- --></div><div class='line5'><!-- --></div><div class='line4'><!-- --></div><div class='line3'><!-- --></div><div class='line2'><!-- --></div><div class='line1'><!-- --></div></div></div>";

            $(thisObject).after(divToAdd);

            //fade after 4 seconds (floating div only)
            $("#errorMsgsFromValidationPlugion" + thisObject.id).delay(4000).fadeOut("slow");
            
            //dismiss the message on text input event
            attachListener('#' + thisObject.id, "#errorMsgsFromValidationPlugion" + thisObject.id);
            $("#errorMsgsFromValidationPlugion" + thisObject.id).offset({ top: position.top, left: position.left + $(thisObject).width() - 100 });
            return false;
        };
        // ------------- end of other functions ------------- //

        return res;
    };
} (jQuery));
