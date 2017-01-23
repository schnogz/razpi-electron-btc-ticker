const lastHalveningBlock = 420000;
const blockBetweenHalvening = 210000;

function getHalveningProgress(currentBlockNum) {
	var percentComplete = (currentBlockNum - lastHalveningBlock) / blockBetweenHalvening * 100;

	// round to 5 decimal places
	return percentComplete.toFixed(5);
}

module.exports = {
	getHalveningProgress: getHalveningProgress
};