import { utils } from "collect-ui/dist/collect-ui.es.js"
/**
 * 更新表单
 * @param api
 * @param storeData
 * @param options
 */
export default async function (
    action: object,
    store: any,
    rootStore: any,
    useApp: any,
    target?: any,
): Promise<any> {
    const grade_list=store.grade_list
    const stage = store.stage_list[store.stage_index]
    const time_left = store.time_left
    parseInt(store.current_training_project.dashboard_time)
    const total_time =  parseInt(store.current_training_project.dashboard_time)
    const spend = total_time-time_left
    const percent = spend / total_time;
    if(stage=='not_start'){
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore("0")
            item.setTimes("0")
            item.setLevel("passed")
            item.setCalories("0")
        }
    }else if(stage=='before_finish'){// 课前结束
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(item['before_score'])
            item.setTimes(item['before_training_times'])
            item.setLevel(item['before_sport_level'])
            item.setCalories(item['before_calories'])
        }
    }else if(stage=='in_finish'){// 课中结束
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(item['in_score'])
            item.setTimes(item['in_training_times'])
            item.setLevel(item['in_sport_level'])
            item.setCalories(item['in_calories'])
        }
    }else if(stage=='after_finish'){// 课后结束
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(item['after_score'])
            item.setTimes(item['after_training_times'])
            item.setLevel(item['after_sport_level'])
            item.setCalories(item['after_calories'])
        }
    }else if(stage=='before_start'){
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(Math.ceil(parseInt(item.before_score) * percent)+"")
            item.setTimes(Math.ceil(parseInt(item.before_training_times) * percent)+"")
            if(spend<=30){//前30秒是合格，后面取数据库
                item.setLevel("passed")
            }else{
                item.setLevel(item['before_sport_level'])
            }
            item.setCalories(Math.ceil(parseInt(item.before_calories) * percent)+"")
        }
    }else if(stage=='in_start'){
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(Math.ceil(parseInt(item.in_score) * percent)+"")
            item.setTimes(Math.ceil(parseInt(item.in_training_times) * percent)+"")
            if(spend<=30){//前30秒是合格，后面取数据库
                item.setLevel("passed")
            }else{
                item.setLevel(item['in_sport_level'])
            }
            item.setCalories(Math.ceil(parseInt(item.in_calories) * percent)+"")
        }
    }else if(stage=='after_start'){
        for(let i=0; i<grade_list.length;i++){
            let item = grade_list[i]
            item.setScore(Math.ceil(parseInt(item.after_score) * percent)+"")
            item.setTimes(Math.ceil(parseInt(item.after_training_times) * percent)+"")
            if(spend<=30){//前30秒是合格，后面取数据库
                item.setLevel("passed")
            }else{
                item.setLevel(item['after_sport_level'])
            }
            item.setCalories(Math.ceil(parseInt(item.after_calories) * percent)+"")
        }
    }
    return utils.getResult(true)
}

