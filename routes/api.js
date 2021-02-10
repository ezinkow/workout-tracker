const router = require("express").Router();
const Workout = require("../models/Workout.js");
var path = require("path");


router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

router.get("/api/workouts/range", (req, res) => {
    const update = function () {
        date = moment(new Date())
        today.html(date.format('YYYY-MMMM-dddd Do'));
    }
    console.log('update', update)
    Workout.aggregate([
        { $sort: { day: 1 } }
        // { $range: }
    ])
        .then(
            workoutRange => {
                res.json(workoutRange)
            }
        )
})
// sort and range

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercise.duration'
                }
            }
        }
    ])
        .then(
            workoutData => {
                res.json(workoutData)
            }
        )
});

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout)
            console.log(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router;