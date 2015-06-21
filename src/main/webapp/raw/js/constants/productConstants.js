/**
 * @description: 商品 constants
 * @author: Patrick.he
 **/
angular.module('flymvo.product.constants', [])
    .constant('productConstants', {
        //商品类型
        productTypes : [
            {value: '0', label: '普通'},
            {value: '1', label: '多规格'}
        ],

        //上架状态
        shelvesStatuses : [
            {value: '0', label: '未上架'},
            {value: '1', label: '已上架'},
            {value: '2', label: '已下架'}
        ],

        //监控状态
        watchStatuses : [
            {value: '0', label: '正常'},
            {value: '1', label: '警告'},
            {value: '2', label: '强制下架'}
        ],

        //推送状态
        pushStatuses : [
            {value: '0', label: '未推送'},
            {value: '2', label: '推送失败'},
            {value: '3', label: '推送成功'}
        ],

        //最大上传单品图片数量
        MAX_UPLOAD_SKU_IMAGE_LIMIT : 5,
        //最大上传详细图片组数量
        MAX_UPLOAD_DESC_GROUP_LIMIT : 8,
        //每个图片组最大上传详细图片数量
        MAX_UPLOAD_DESC_IMAGE_LIMIT : 5,
        //每个商品最多货品数
        MAX_SKU_NUM_LIMIT : 60


    });
