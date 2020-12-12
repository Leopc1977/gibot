function getStars(numberStart) {
  switch(numberStart){
    case 1:
      return '🌟'
    case 2:
      return '🌟🌟'
    case 3:
      return '🌟🌟🌟'
    case 4:
      return '🌟🌟🌟🌟'
    case 5:
      return '🌟🌟🌟🌟🌟'
    case 6:
      return '🌟🌟🌟🌟🌟🌟'
    default:
  }
}

function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

module.exports.getStars = getStars;
module.exports.capitalizeFirstLetter = capitalizeFirstLetter;
