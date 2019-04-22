<template>
    <div class="nav_label">
        <!--tabs-->
        <div class="tab_box">
            <span v-for="item in dateTypeTabList"
                  :class="[activeTab.dateType == item.dateType ? activeClass : '', normalStyle]"
                  @click="activeState(item.name, item.dateType)">
                  {{ item.label }}
            </span>
        </div>
        <!--下划线-->
        <div :style="underline_style"></div>
        <!--球类型-->
        <ball-kind></ball-kind>
    </div>
</template>

<script src="../../js/home/navLabel.js"></script>

<style scoped lang="scss">
    @import "../../scss/home/navLabel.scss";
</style>
