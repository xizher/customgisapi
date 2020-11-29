# 自定义 GIS API

## 矩阵基础（Canvas Matrix）

### 坐标

- Latlon => 地理经纬度坐标
- Projection => 地理平面坐标（投影坐标）
- Screen => 屏幕平面坐标

### Matrix

- `a`水平方向的缩放 (Scale X)
- <s>`b`水平方向的倾斜偏移</s>
- <s>`c`竖直方向的倾斜偏移</s>
- `d`竖直方向的缩放 (scale Y)
- `e`水平方向的移动 (translate X)
- `f`竖直方向的移动 (translate Y)

```js
[a, b, e
 b, d, f
 0, 0, 1]
```

### Matrix API

- Get & Set：`getTransform` & `setTransform`
- `transform(a, b, c, d, e, f)` （屏幕坐标 => 屏幕坐标）
- `setTransform(a, b, c, d, e, f)` （地理坐标 => 屏幕坐标）
- `scale(x, y)` & `translate(x, y)` （屏幕坐标 => 屏幕坐标）