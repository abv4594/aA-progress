### Get a specific artist's details based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers: 
    - Content-Type: application/json
- Body:
```json
{
    "name": "Red Hot Chili Peppers",
    "artistId": 1,
    "albuns": [
        {
            "name": "Stadium Arcadium", 
            "albumId": 1,
            "artistId": 1
        }
    ]
}
```

### Add an artist

Request components:

- Method: POST
- URL: /artists
- Headers: 
    - Content-Type: application/json
- Body: 
```json
{
    "name": "new Artist"
}
```

Response components:

- Status code: 201 (created)
- Headers:
    - Content-Type: application/json
- Body:
```json
{
    "name": "Also Snoopy",
    "artistId": 2
}
```

### Edit a specified artist by artistId

Request components:

- Method: PUT/PATCH
- URL: artists/:artistId
- Headers: 
    - Content-Type: application/json
- Body:
```json
{
    "name": "new name"
}
```

Response components:

- Status code: 200 
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "artistId": 2,
    "name": "new name",
    "updatedAt": ...
}
```

### Delete a specified artist by artistId

Request components:

- Method: DELETE
- URL: /artists/:artistId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "message": "succesfully deleted"
}
```
### Get all albums of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId/albums
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "albumId": 1,
    "name": "...",
    "artistId": ...
} 
```

### Get a specific album's details based on albumId

Request components: 

- Method: GET
- URL: /albums/:albumId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "name": "...",
    "albumId": "...",
    "artistId":,
    "artist": {

    },
    "songs": [
        {},
        {},
    ]

}
```

### Add an album to a specific artist based on artistId

Request components:

- Method: POST
- URL: /artists/:artistId/albums
- Headers:
    Content-Type: application/json
- Body:
```json
    {
        "name": "new Album"
    }
```

Response components:

- Status code: 201 (created)
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "name": "new Album",
    "albumId": 2,
    "artistId": 1
}
```

### Edit a specified album by albumId

Request components:

- Method: PUT/PATCH
- URL: /albums/:albumId
- Headers: 
    Content-Type: application/json
- Body:
```json
{
    "name": "Edited Fetch"
}
```

Response components:

- Status code: 200
- Headers: 
    Content-Type: application/json
- Body:
```json
{
    "name": "Edited Fetch",
    "albumId": 3,
    "artistId": 2,
    "updatedAt":
}

```

### Delete a specified album by albumId

Request components:

- Method: DELETE
- URL: /albums/:albumId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{"message": "Sucessfully deleted"}
```

### Get all songs of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/:artistId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{
    [
        {},
        {},
    ]
}
```

### Get all songs of a specific album based on albumId

Request components:

- Method: GET
- URL: /albums/:albumId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    Content-Type: application/json

- Body:
```json
{
    [
        {}
    ]
}
```

### Get all songs of a specified trackNumber

**Note: This one is meant to be a little more challenging, but should still
follow a similar pattern to those above.**

Can you see a pattern between this endpoint and the two previous endpoints?

Hint: Think of how you solved getting all songs by a specific artist and by a
specific album. What is resource that you wanted to get back for those
endpoints? What information was that resource constrained by for each of those
endpoints? Now think about getting all songs by a specific `trackNumber`.
What is the resource you want to get? What information is the resource
constrained by for this endpoint?

Request components:

- Method: GET
- URL: /tracknumbers/1/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers: 
    Content-Type: application/json
- Body:
```json
{ [
    {},
    {}
]}
```

### Get a specific song's details based on songId

Request components:

- Method: GET
- URL: /songs/:songId 
- Headers: none
- Body: none


Response components:

- Status code: 200
- Headers:
    Content-Type: application/json
- Body:
```json
{
    "name": ,
    "lyrics": ,
    "trackNumber":,
    "songId":,
    "albumId":,
    ...
}
```


### Add a song to a specific album based on albumId

Request components:

- Method: POST
- URL: /albums/:albumId/songs
- Headers: 
    Content-Type: application/json
- Body:
```json
{
    "name": ...,
    "trackNumber": ...,
    "lyrics": ...
}
```

Response components:

- Status code: 201 (created)
- Headers: 
    Content-Type: application/json
- Body:
```json
{
    "name": "Quero Chiclete",
    "lyrics": "Quero chiclete chiclete\n quero chiclete!",
    "trackNumber": 1,
    "songId": 2,
    "albumId": 1
}
```

### Edit a specified song by songId

Request components:

- Method:
- URL:
- Headers:
- Body:

Response components:

- Status code:
- Headers:
- Body:

### Delete a specified song by songId

Request components:

- Method:
- URL:
- Headers:
- Body:

Response components:

- Status code:
- Headers:
- Body: