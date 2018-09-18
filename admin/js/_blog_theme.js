/*global $, dotclear */
'use strict';

$(function() {
  // expend theme info
  $('.module-sshot').not('.current-theme .module-sshot').each(function() {
    const bar = $('<div>').addClass('bloc-toggler');
    $(this).after(
      $(bar).toggleWithLegend($(this).parent().children('.toggle-bloc'), {
        img_on_txt: dotclear.img_plus_theme_txt,
        img_on_alt: dotclear.img_plus_theme_alt,
        img_off_txt: dotclear.img_minus_theme_txt,
        img_off_alt: dotclear.img_minus_theme_alt,
        legend_click: true
      }));
    $(this).children('img').click(function() {
      // Click on theme thumbnail
      $(this).parent().parent().children('.bloc-toggler').click();
    });
  });

  // dirty short search blocker
  $('div.modules-search form input[type=submit]').click(function() {
    const mlen = $('input[name=m_search]', $(this).parent()).val();
    if (mlen.length > 2) {
      return true;
    } else {
      return false;
    }
  });

  // checkboxes selection
  $('.checkboxes-helpers').each(function() {
    dotclear.checkboxesHelpers(this);
  });

  // actions tests
  $('.modules-form-actions').each(function() {
    const rxActionType = /^[^\[]+/;
    const rxActionValue = /([^\[]+)\]$/;
    const checkboxes = $(this).find('input[type=checkbox]');

    // check if submit is a global action or one line action
    $('input[type=submit]', this).click(function() {
      const keyword = $(this).attr('name');
      if (!keyword) {
        return true;
      }
      const maction = keyword.match(rxActionType);
      const action = maction[0];
      const mvalues = keyword.match(rxActionValue);

      // action on multiple modules
      if (!mvalues) {
        let checked = false;

        // check if there is checkboxes in form
        if (checkboxes.length > 0) {
          // check if there is at least one checkbox checked
          $(checkboxes).each(function() {
            if (this.checked) {
              checked = true;
            }
          });
          if (!checked) {
            //alert(dotclear.msg.no_selection);
            return false;
          }
        }

        // confirm delete
        if (action == 'delete') {
          return window.confirm(dotclear.msg.confirm_delete_themes);
        }

        // action on one module
      } else {
        const module = mvalues[1];

        // confirm delete
        if (action == 'delete') {
          return window.confirm(dotclear.msg.confirm_delete_theme.replace('%s', module));
        }
      }

      return true;
    });
  });
});
