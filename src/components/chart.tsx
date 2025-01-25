// App.js
import React, {Suspense, lazy} from 'react';
import ReactECharts from 'echarts-for-react';
import {utils} from "collect-ui/dist/collect-ui.es.js"
import 'echarts-liquidfill';
/**
 * 将 ECharts 配置中的 formatter 字符串转换为函数
 * @param {Object} option - ECharts 配置对象
 * @param {Array} formatterKeys - 需要转换的 formatter 键名数组
 */
function convertFormatters(option, formatterKeys) {
    if (!option || !option.series) return;

    option.series.forEach(item => {
        formatterKeys.forEach(key => {
            const attr = item[key]
            if(attr){
                // 判断formatter是否为字符串并包含${}
                if(attr.formatter && utils.hasVar(attr.formatter)){
                    const expression= utils.expression_name(attr.formatter)
                    item[key].formatter = new Function('return ' + expression)();
                }else if(utils.hasVar(attr)){// 判断本身
                    const expression= utils.expression_name(attr)
                    item[key] =  new Function('return ' + expression)()
                }
            }

        });
    });
}
const EChartComponent = (props) => {
    const {...rest} = props
    const {...newProps} = utils.transferProp(rest, "chart")

    const show = utils.getVisible(props)
    if (!show) {
        return null
    }
    let option = newProps.option

    convertFormatters(option, ['axisLabel', 'detail','symbolSize']);
    return <ReactECharts option={option} {...newProps}/>;
};

// 使用React.lazy动态导入组件，并使用setTimeout延迟1秒加载
const LazyComponent = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                //@ts-ignore
                default: (props) => {
                    return <EChartComponent {...props}/>
                }
            });
        }, 50); // 延迟
    });
});
const App = (props) => {
    const show = utils.getVisible(props)
    if (!show) {
        return null
    }
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <LazyComponent {...props}/>
        </Suspense>

    );
};

export default App;