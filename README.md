# User Service

## Public API Methods

- [`PUT` Create User](#create-user)
- [`GET` Get User by ID](#get-user-by-id)
- [`GET` Get User by Username](#get-user-by-id)

### Create User
Given a username, first name, and last name, create a new user.
- Path: `/users`
- Method: `PUT`
- Body: 
```
{
   "username": "johndoe",
   "first_name": "John",
   "last_name": "Doe"
}
```
- Response:
```
{
    "user_id": 2,
    "user_name": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2020-05-18T21:59:06.610Z",
    "date_last_seen": null,
    "date_deleted": null,
    "user_image": null,
    "user_about": null
    },
```

### Get User by ID
Given a valid user ID as an integer, return that user's information.
- Path: `/users/id/:id`
- Method: `GET`
- Response:
```
{
    "user_id": 2,
    "user_name": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2020-05-18T21:59:06.610Z",
    "date_last_seen": null,
    "date_deleted": null,
    "user_image": null,
    "user_about": null
    },
```

### Get User by Username
Given a valid username as a string, return that user's information.
- Path: `/users/username/:username`
- Method: `GET`
- Response:
```
{
    "user_id": 2,
    "user_name": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2020-05-18T21:59:06.610Z",
    "date_last_seen": null,
    "date_deleted": null,
    "user_image": null,
    "user_about": null
    },
```