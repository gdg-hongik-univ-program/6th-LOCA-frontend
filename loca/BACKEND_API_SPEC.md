# LOCA Backend API Request Spec

## Current Frontend Integration

Frontend base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://192.168.164.130:8080
```

Current frontend calls are centralized in:

- `src/lib/apiClient.ts`
- `src/services/placeService.ts`
- `src/services/tagService.ts`
- `src/services/collectionService.ts`

If the backend is unreachable, the UI falls back to mock data so screens do not break.

## Existing Place / Tag APIs Used

### Get Places

`GET /api/places`

Used by:

- `/explore`
- `/map`
- `/admin`
- `/admin/places`

Expected response:

```ts
Place[]
```

### Get Place Detail

`GET /api/places/{placeId}`

Used by:

- `/place/[id]`

Expected response:

```ts
Place
```

### Get Tags

`GET /api/tags`

Used by:

- `/explore`
- `/map`
- `/admin`
- `/admin/places`
- `/admin/tags`

Expected response:

```ts
Tag[]
```

## Existing Admin APIs Used

### Create Place

`POST /api/admin/places`

Used by:

- `/admin/places`
- `/place/new`

Request:

```ts
{
  kakaoPlaceId?: string;
  visibility?: "public" | "private";
  source?: "kakao" | "user";
  registrationMethod?: "photoGps" | "currentLocation" | "mapSelect" | "manual";
  name: string;
  category: "cafe" | "food" | "bar" | "culture" | "beauty" | "workshop";
  address: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl: string;
  tagIds: string[];
}
```

### Update Place

`PUT /api/admin/places/{placeId}`

### Delete Place

`DELETE /api/admin/places/{placeId}`

### Create Tag

`POST /api/admin/tags`

Request:

```ts
{
  name: string;
}
```

### Delete Tag

`DELETE /api/admin/tags/{tagId}`

## Additional APIs Needed For New Differentiation Features

### 1. Public Place / Private Place

Current `Place` response should include:

```ts
{
  id: string;
  kakaoPlaceId?: string;
  visibility: "public" | "private";
  source: "kakao" | "user";
  name: string;
  category: string;
  categoryLabel?: string;
  tags: string[];
  address: string;
  lat: number;
  lng: number;
  averageRating?: number;
  visitCount?: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  distance?: string;
  createdBy?: string;
  registrationMethod?: "photoGps" | "currentLocation" | "mapSelect" | "manual";
}
```

Recommended filters:

`GET /api/places?visibility=public`

`GET /api/places?visibility=private`

`GET /api/places?source=kakao`

`GET /api/places?source=user`

### 2. Private Place Registration

Needed for user-created hidden spots, benches, photo spots, walking points.

Recommended endpoint:

`POST /api/places/private`

Request:

```ts
{
  name: string;
  category: string;
  address?: string;
  lat: number;
  lng: number;
  description?: string;
  imageUrl?: string;
  tagIds?: string[];
  registrationMethod: "photoGps" | "currentLocation" | "mapSelect" | "manual";
}
```

Response:

```ts
Place
```

### 3. Photo GPS / EXIF Upload

Needed for automatic location registration from photo metadata.

Recommended endpoint:

`POST /api/uploads/place-photo`

Request:

`multipart/form-data`

Fields:

- `file`: image file

Response:

```ts
{
  imageUrl: string;
  exifLat?: number;
  exifLng?: number;
  hasGps: boolean;
}
```

### 4. Current Location Registration

No backend geolocation API is required if the client sends `lat/lng`.

Backend only needs to accept coordinates through private place create API.

Optional reverse geocoding endpoint:

`GET /api/geo/reverse?lat={lat}&lng={lng}`

Response:

```ts
{
  address: string;
}
```

### 5. Place Collections

Needed for mixed public/private course creation and sharing.

#### Get Collections

`GET /api/collections`

Response:

```ts
Collection[]
```

#### Get Collection Detail

`GET /api/collections/{collectionId}`

or shared link:

`GET /api/collections/share/{shareSlug}`

Response:

```ts
{
  id: string;
  title: string;
  description: string;
  visibility: "private" | "shared" | "public";
  shareSlug: string;
  placeIds: string[];
  places: Place[];
  coverImageUrl: string;
  createdAt: string;
}
```

#### Create Collection

`POST /api/collections`

Request:

```ts
{
  title: string;
  description: string;
  visibility: "private" | "shared" | "public";
  placeIds: string[];
}
```

#### Update Collection

`PUT /api/collections/{collectionId}`

#### Delete Collection

`DELETE /api/collections/{collectionId}`

#### Create Share Link

`POST /api/collections/{collectionId}/share`

Response:

```ts
{
  shareSlug: string;
  shareUrl: string;
}
```

## Review / Local Diary APIs Needed

The frontend Review screen now records a Local Diary, not a simple rating review.

Recommended endpoint:

`POST /api/reviews`

Request:

```ts
{
  placeId: string;
  title: string;
  companion: "alone" | "friend" | "date" | "family" | "other";
  mood: "happy" | "calm" | "excited" | "inspired" | "lonely" | "stressed";
  keywords: string[];
  memory: string;
  review: string;
  satisfaction: number;
  expense: number | null;
  expenseUnknown: boolean;
  atmosphereTags: string[];
  images: string[];
  futureMemo: string;
}
```

Recommended list endpoints:

`GET /api/reviews/me`

`GET /api/places/{placeId}/reviews`

## Error Handling

Recommended backend errors:

- `409`: duplicate place or duplicate tag
- `400`: invalid request body
- `404`: place, tag, or collection not found
- `500`: server error

Frontend displays friendly messages and falls back to mock data for read APIs when the server is unavailable.
