### Endpoints

**ดึงข้อมูลสินค้าชิ้นเดียว**
Method: GET
URL: `base_url`/product/{id}

**ดึงข้อมูลสินค้าทั้งหมด**
Method: GET
URL: `base_url`/products

**สร้างข้อมูลสินค้า**
Method: POST
URL: `base_url`/products
Body (JSON):
```json
{
  "name": "Empty Crate",
  "description": "description",
  "thumbnailUrl": "/thumbnail.jpeg",
  "price": 9.99,
  "quantity": 10
}
```

**แก้ไขข้อมูลสินค้า**
Method: PUT
URL: `base_url`/product/{id}
Body (JSON):
```json
{
  "id": 4,
  "name": "Empty Crate Pro Max",
  "price": 19.99,
  "quantity": 5
}
```

**ลบสินค้า**
Method: DELETE
URL: `base_url`/product/{id}
Body (JSON):
```json
{
  "id": 3
}
```

**ซื้อสินค้า**
Method: POST
URL: `base_url`/product/{id}/buy
Body (JSON):
```json
{
  "id": 4,
  "quantity": 1
}
```