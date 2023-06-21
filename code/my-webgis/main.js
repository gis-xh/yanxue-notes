import './style.css';
import {
  Map,
  View
} from 'ol';
import ImageLayer from 'ol/layer/Image';
import {
  OSM,
  ImageWMS
} from 'ol/source';
// 缩放滑动工具条
import ZoomSlider from 'ol/control/ZoomSlider';
// 获取地图中心
import { getCenter } from 'ol/extent';
// 绘制矢量
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// 点线面要素
import Feature from 'ol/Feature';
import PT from 'ol/geom/Point';
import LS from 'ol/geom/LineString';
import PY from 'ol/geom/Polygon';
// 绘制风格
import {
  Circle,
  Fill,
  Stroke,
  Style
} from 'ol/style';
// 选择和编辑
import {
  Select,
  Modify
} from 'ol/interaction';

//地图范围
const extent = [60, -80, 160, 80];
//获取地图中心点
const center = getCenter(extent);
//投影坐标系
const projection = 'EPSG:4326';
//基于 Geoserver 的 WMS 访问基地址
const GeoWMS = 'http://localhost:8080/geoserver/ne/wms';
const map = new Map({
  target: 'map',
  layers: [
    new ImageLayer({
      //创建 WMS 图层对象
      source: new ImageWMS({
        //WMS服务地址
        url: GeoWMS,
        //图层等参数
        params: {
          'LAYERS': 'ne:countries',
          'TILED': true
        },
        //服务类型
        serverType: 'geoserver'
      })
    })
  ],
  view: new View({
    center: center,
    zoom: 2,
    projection: projection
  })
});
map.addControl(new ZoomSlider());

// 绘制样式
const fill = new Fill({ color: 'rgba(255,255,255,0.4)', });
const stroke = new Stroke({
  color: '#ffcc33',
  width: 2,
});
// 创建一个矢量数据源对象
const vecSource = new VectorSource();
// 创建一个矢量图层对象
const vecLayer = new VectorLayer({
  source: vecSource,
  style: new Style({
    //填充
    fill: fill,
    //线
    stroke: stroke,
    //图像
    image: new Circle({
      fill: fill,
      stroke: stroke,
      // 图像大小
      radius: 5
    })
  })
});

// 绘制对象类型
const typeSelect = document.getElementById('drawType');
const drawType = typeSelect.value;
const draw = new Draw({
  source: vecSource,
  type: drawType,
  // maxPoints: 3
});

// 开始绘制按钮
const startDraw = document.getElementById('startDraw');
startDraw.addEventListener('click', () => {
  // 将下拉选择框和开始绘制按钮设置为不可用状态
  typeSelect.disabled = true;
  startDraw.disabled = true;
  // 切换开始绘制按钮为可用状态
  endDraw.disabled = false;
  // 将绘制交互对象添加到地图上
  map.addInteraction(draw);
});
// 结束绘制按钮
const endDraw = document.getElementById('endDraw');
endDraw.addEventListener('click', () => {
  // 将下拉选择框和开始绘制按钮设置为可用状态
  typeSelect.disabled = false;
  startDraw.disabled = false;
  // 切换结束绘制按钮为不可用状态
  endDraw.disabled = true;
  // 移除地图上的绘制交互对象
  map.removeInteraction(draw);
});

