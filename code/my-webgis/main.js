import './style.css';
import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import { OSM, ImageWMS } from 'ol/source';
// 缩放滑动工具条
import ZoomSlider from 'ol/control/ZoomSlider';
// 添加投影，单位，获取中心
// import Projection from 'ol/proj/Projection';
// import { METERS_PER_UNIT } from 'ol/proj/Units';
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
  Style,
  Stroke
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