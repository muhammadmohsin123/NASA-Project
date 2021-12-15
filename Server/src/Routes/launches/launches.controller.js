const {
  getAllLaunches,
  schduleNewLaunch,
  existsLaunchWithId,
  abortLaunchByID,
} = require("../../Models/launches.modal");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  let launch = req.body;
  //Validation
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required properties",
    });
  }
  //Converting string into a date object
  launch.launchDate = new Date(launch.launchDate);
  //Date validation
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }

  await schduleNewLaunch(launch);
  res.status(201).json(launch);
}
// DELETE REQUEST
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  //if launch does not exists
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunchByID(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not abortrd",
    });
  }
  //if launch exists
  return res.status(200).json({
    ok: true,
  });
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
