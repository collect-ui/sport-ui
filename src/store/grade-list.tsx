import { types, Instance } from "mobx-state-tree";

const grade = types
    .model("grade", {
            score: "0",
            times: "0",
            calories: "0",
            level: "passed",
            after_calories: types.string,
            after_evaluate: types.string,
            after_score: types.string,
            after_sport_level: types.string,
            after_sport_level_name: types.string,
            after_training_times: types.string,
            before_calories: types.string,
            before_evaluate: types.string,
            before_score: types.string,
            before_sport_level: types.string,
            before_sport_level_name: types.string,
            before_training_times: types.string,
            course_grade_id: types.string,
            course_id: types.string,
            create_time: types.string,
            dashboard_type: types.string,
            group_name: types.string,
            in_calories: types.string,
            in_evaluate: types.string,
            in_score: types.string,
            in_sport_level: types.string,
            in_sport_level_name: types.string,
            in_training_times: types.string,
            sport_level: types.string,
            sport_level_name: types.string,
            student_name: types.string,
            teacher_name: types.string,
            total_score: types.number,
            training_project_code: types.string,
            username: types.string,
    })
    .actions((self) => ({
            setUsername(name: string) {
                    self.username = name;
            },
            setScore(score: string) {
                    self.score = score;
            },
            setTimes(times: string) {
                    self.times = times;
            },
            setCalories(calories: string) {
                    self.calories = calories;
            },
            setLevel(level: string) {
                    self.level = level;
            },
            setAfterCalories(calories: string) {
                    self.after_calories = calories;
            },
            setAfterEvaluate(evaluate: string) {
                    self.after_evaluate = evaluate;
            },
            setAfterScore(score: string) {
                    self.after_score = score;
            },
            setAfterSportLevel(level: string) {
                    self.after_sport_level = level;
            },
            setAfterSportLevelName(name: string) {
                    self.after_sport_level_name = name;
            },
            setAfterTrainingTimes(times: string) {
                    self.after_training_times = times;
            },
            setBeforeCalories(calories: string) {
                    self.before_calories = calories;
            },
            setBeforeEvaluate(evaluate: string) {
                    self.before_evaluate = evaluate;
            },
            setBeforeScore(score: string) {
                    self.before_score = score;
            },
            setBeforeSportLevel(level: string) {
                    self.before_sport_level = level;
            },
            setBeforeSportLevelName(name: string) {
                    self.before_sport_level_name = name;
            },
            setBeforeTrainingTimes(times: string) {
                    self.before_training_times = times;
            },
            setCourseGradeId(id: string) {
                    self.course_grade_id = id;
            },
            setCourseId(id: string) {
                    self.course_id = id;
            },
            setCreateTime(time: string) {
                    self.create_time = time;
            },
            setDashboardType(type: string) {
                    self.dashboard_type = type;
            },
            setGroupName(name: string) {
                    self.group_name = name;
            },
            setInCalories(calories: string) {
                    self.in_calories = calories;
            },
            setInEvaluate(evaluate: string) {
                    self.in_evaluate = evaluate;
            },
            setInScore(score: string) {
                    self.in_score = score;
            },
            setInSportLevel(level: string) {
                    self.in_sport_level = level;
            },
            setInSportLevelName(name: string) {
                    self.in_sport_level_name = name;
            },
            setInTrainingTimes(times: string) {
                    self.in_training_times = times;
            },
            setSportLevel(level: string) {
                    self.sport_level = level;
            },
            setSportLevelName(name: string) {
                    self.sport_level_name = name;
            },
            setStudentName(name: string) {
                    self.student_name = name;
            },
            setTeacherName(name: string) {
                    self.teacher_name = name;
            },
            setTotalScore(score: number) {
                    self.total_score = score;
            },
            setTrainingProjectCode(code: string) {
                    self.training_project_code = code;
            },
    }))
    .views((self) => ({
            get getUsername() {
                    return self.username;
            },
            get getScore() {
                    return self.score;
            },
            get getTimes() {
                    return self.times;
            },
            get getCalories() {
                    return self.calories;
            },
            get getLevel() {
                    return self.level;
            },
            get getAfterCalories() {
                    return self.after_calories;
            },
            get getAfterEvaluate() {
                    return self.after_evaluate;
            },
            get getAfterScore() {
                    return self.after_score;
            },
            get getAfterSportLevel() {
                    return self.after_sport_level;
            },
            get getAfterSportLevelName() {
                    return self.after_sport_level_name;
            },
            get getAfterTrainingTimes() {
                    return self.after_training_times;
            },
            get getBeforeCalories() {
                    return self.before_calories;
            },
            get getBeforeEvaluate() {
                    return self.before_evaluate;
            },
            get getBeforeScore() {
                    return self.before_score;
            },
            get getBeforeSportLevel() {
                    return self.before_sport_level;
            },
            get getBeforeSportLevelName() {
                    return self.before_sport_level_name;
            },
            get getBeforeTrainingTimes() {
                    return self.before_training_times;
            },
            get getCourseGradeId() {
                    return self.course_grade_id;
            },
            get getCourseId() {
                    return self.course_id;
            },
            get getCreateTime() {
                    return self.create_time;
            },
            get getDashboardType() {
                    return self.dashboard_type;
            },
            get getGroupName() {
                    return self.group_name;
            },
            get getInCalories() {
                    return self.in_calories;
            },
            get getInEvaluate() {
                    return self.in_evaluate;
            },
            get getInScore() {
                    return self.in_score;
            },
            get getInSportLevel() {
                    return self.in_sport_level;
            },
            get getInSportLevelName() {
                    return self.in_sport_level_name;
            },
            get getInTrainingTimes() {
                    return self.in_training_times;
            },
            get getSportLevel() {
                    return self.sport_level;
            },
            get getSportLevelName() {
                    return self.sport_level_name;
            },
            get getStudentName() {
                    return self.student_name;
            },
            get getTeacherName() {
                    return self.teacher_name;
            },
            get getTotalScore() {
                    return self.total_score;
            },
            get getTrainingProjectCode() {
                    return self.training_project_code;
            },
    }));

const GradeList = types.array(grade);

export default GradeList;
export type IGrade = Instance<typeof grade>;