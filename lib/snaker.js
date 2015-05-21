'use strict';

module.exports = function(str) {
  str = str.trim();

  // Remove any prefixed or affixed underscores or hyphens
  str = str.replace(/^(_|\-)+/, '');
  str = str.replace(/(_|\-)+$/, '');

  // First character to lower
  var fixed = str.replace(/^[A-Z]/, function(match) {
    return match.toLowerCase();
  });

  // All other characters to lower prefixed with underscore
  fixed = fixed.replace(/[A-Z]/g, function(match) {
    return '_' + match.toLowerCase();
  });

  // Squash consecutive underscores
  fixed = fixed.replace(/(_|\-)+/, '_');

  return fixed;
};
