import "./style.css";
import { Map, View } from "ol";
import ImageLayer from "ol/layer/Image";
import { OSM, ImageWMS } from "ol/source";
// 缩放滑动工具条
import ZoomSlider from "ol/control/ZoomSlider";
// 获取地图中心
import { getCenter } from "ol/extent";
// 绘制矢量
import Draw from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// 绘制风格
import { Circle, Fill, Stroke, Style } from "ol/style";
// 选择和编辑
import { Select, Modify } from "ol/interaction";
// 地图事件: 单击和悬停
import { click, pointerMove } from "ol/events/condition";

//地图范围
const extent = [60, -80, 160, 80];
//获取地图中心点
const center = getCenter(extent);
//投影坐标系
const projection = "EPSG:4326";
//基于 Geoserver 的 WMS 访问基地址
const GeoWMS = "http://localhost:8080/geoserver/ne/wms";
const map = new Map({
  target: "map",
  layers: [
    new ImageLayer({
      //创建 WMS 图层对象
      source: new ImageWMS({
        //WMS服务地址
        url: GeoWMS,
        //图层等参数
        params: {
          LAYERS: "ne:countries",
          TILED: true,
        },
        //服务类型
        serverType: "geoserver",
      }),
    }),
  ],
  view: new View({
    center: center,
    zoom: 2,
    projection: projection,
  }),
});
map.addControl(new ZoomSlider());

// 创建矢量数据源对象
const vecSource = new VectorSource();
// 创建矢量图层对象
const vecLayer = new VectorLayer({
  source: vecSource,
});
map.addLayer(vecLayer);

// 选择对象类型
const typeSelect = document.getElementById("drawType");
let draw;
function addDrawInteraction() {
  const value = typeSelect.value;
  draw = new Draw({
    source: vecSource,
    type: value,
  });
  map.addInteraction(draw);
}
// 监听下拉选择框的变化
typeSelect.onchange = () => {
  map.removeInteraction(draw);
  // 将绘制交互对象添加到地图上
  addDrawInteraction();
};

// 选择要素
// 高亮要素的样式
const highlight = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0)", // 设置为全透明
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    width: 2,
  }),
});
// 选中要素的样式
const selected = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.3)", // 设置为伪透明
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    width: 2,
  }),
});
// 悬停时高亮要素
const highlightPointerMove = new Select({
  condition: pointerMove,
  style: highlight,
});
// 单击时选中要素
const selectClick = new Select({
  condition: click,
  style: selected,
});

// 绘制开关
const changeState = document.getElementById("drawState");
function handleDraw() {
  if (changeState.checked) {
    // 将下拉选择框设置为可用状态
    typeSelect.disabled = false;
    // 移除其他交互，只保留绘制交互
    map.removeInteraction(highlightPointerMove);
    map.removeInteraction(selectClick);
    addDrawInteraction();
  } else {
    // 将下拉选择框设置为不可用状态
    typeSelect.disabled = true;
    // 保留已绘图形，停止绘制交互
    map.removeInteraction(draw);
    // 添加两个交互到地图上
    map.addInteraction(highlightPointerMove);
    map.addInteraction(selectClick);
  }
}
// 监听绘制开关的变化
changeState.onchange = () => {
  handleDraw();
};
