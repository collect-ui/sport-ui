import {BasePullDown} from "collect-ui/dist/collect-ui.es.js";

const config = {
    name: "附件列表",
    api: "/template_data/data",
    data: {
        "service": "system.attachment_list",
    },
    mountGetData: true,
    pagination: false,
    method: 'post',
    width: 700,
    multiple: false,
    labelField: "path",
    valueField: "path",
    // 搜索字段
    searchField: "search",
    // 搜索提示
    searchPlaceholder: "请输入附件名称",
    placeholder: "请选择附件",
    attrs:['filetype'],
    //搜索字段默认值
    searchFieldDefaultValue: "",
    colDefs: [
        {
            "headerName": "#",
            "width": 50,
            "suppressSizeToFit": true,
            "valueGetter": "node.rowIndex + 1",
            "sortable": false,
            "pinned": "left"
        },
        {
            "checkboxSelection": true,
            "headerCheckboxSelection": true,
            "headerName": "标题",
            "field": "title",
            "width": 160,
            "suppressSizeToFit": true,
        },
        {

            "headerName": "文件名称",
            "field": "filename",
            "width": 160,
            "suppressSizeToFit": true,
        },
        {
            "headerName": "附件",
            "field": "title",
            "autoHeight": true,
            "cellRender": {
                "tag": "attachment-show",
                "path": "${row.path}",
                "height": "${row.filetype=='audio'?30:80}",
                "width": "${row.filetype=='image'?'':'100%'}"
            }
        }

    ],
    "afterRender": {
        "tag": "attachment-show",
        "path": "${value}",
        "height":"${getFileType(value)=='audio'?30:120}",
        "width": "${getFileType(value)=='image'?'':'100%'}"
    }


}

export default new BasePullDown(config);
