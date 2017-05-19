<template>
    <div class="m-tabbar-item" :class="{'is-active':isActive}">
        <router-link :to="{name:path}" tag='div'>
            <span class="m-tabbar-item-icon"><slot name="icon-normal"></slot></span>
            <span class="m-tabbar-item-icon active"><slot name="icon-active"></slot></span>
            <span class="m-tabbar-item-text"><slot></slot></span>
        </router-link>
    </div>
</template>
<script>
/**
 * m-tab-item
 * @desc 搭配 tabbar使用
 * @param id - 选中后的返回值，任意类型
 * @param isActive - 根据父组件的value和当前组件的id判断是否为选中状态
 * @param $parent.$emit('input',id) - 触发父组件的自定义事件
 * @param {slot} [icon-normal] - icon-默认图标
 * @param {slot} [icon-active] - icon-选中图标
 * @param {slot} - 文字
 *
 * @example
 * <m-tabbar-item id='tab1'>
 *       <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal"> 
 *       <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active"> 
 *       首页
 * </m-tabbar-item>
 */
    export default{
        props: {
        	id:{
        		type:String
        	},
            path:{
                type:String,
                default:'/'
            }
        }
       
    }
</script>
<style lang="less">
@import "../assets/less/var.less";
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .router-link-active{
        .m-tabbar-item-icon{
            display: none;
            &.active{
                display: block;
            }
        }
         .m-tabbar-item-text{
            color: @tabbarActiveColor;
        }
    }
   
    .m-tabbar-item-icon{
        display: block;
        padding-top: 2px;
        &.active{
            display: none;
        }
        img{
            width: 28px;
            height: 28px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 10px;
        color:#949494;
    }
   
}
</style>