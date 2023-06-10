---
title: custom-component
contentBar: false
---

<!-- import custom file in markdown -->

:content-doc{path="/docs/custom-component/_shared/select-libraries"}

# Account

::code-box{lang="Restful" method="GET" endpoint="/v1/account"}

## Account

Using our Account Method, users are now able to easily retrieve their account information.

#code

```bash
$ curl --request GET \
  https://api.trader4.net/v1/account
```

::

::code-box{lang="Python" method="GET" endpoint="/v1/account"}

## Account
Using our Account Method, users are now able to easily retrieve their account information.

::

::Response{jfile="v1/user/account" }

#result
---
- `country` <span>String</span>

  The country that user registered. Check out [ISO 3166-1 Alpha-3](https://www.iso.org/iso-3166-country-codes.html).
---
- `language` <span>String</span><br>
 The language that user selected. Check out [ISO 639-1](https://www.iso.org/iso-639-language-codes.html).

---

- `timezone` <span>String</span><br>
 The timezone that user selected. Check out [Timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

--- 

- `currency` <span>String</span><br>
 The currency that user selected. Check out [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
---
- `last_connection` <span>Datetime</span><br>
 The last time that user connected to our system. Check out [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).
---
- `private` <span>Boolean</span><br>
 The privacy of user profile.
---
- `avatar` <span>String</span><br>
 The URL of user avatar.
---
- `country` <span>String</span><br>
 The country that user registered. Check out [ISO 3166-1 Alpha-3](https://www.iso.org/iso-3166-country-codes.html).
---
- `language` <span>String</span><br>
 The language that user selected. Check out [ISO 639-1](https://www.iso.org/iso-639-language-codes.html).
---
- `timezone` <span>String</span><br>
 The timezone that user selected. Check out [Timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
---
- `currency` <span>String</span><br>
 The currency that user selected. Check out [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
---
- `last_connection` <span>Datetime</span><br>
 The last time that user connected to our system. Check out [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).
---
- `private` <span>Boolean</span><br>
 The privacy of user profile.
---
- `avatar` <span>String</span><br>
 The URL of user avatar.
---
- `country` <span>String</span><br>
 The country that user registered. Check out [ISO 3166-1 Alpha-3](https://www.iso.org/iso-3166-country-codes.html).
---
- `language` <span>String</span><br>
 The language that user selected. Check out [ISO 639-1](https://www.iso.org/iso-639-language-codes.html).
---
- `timezone` <span>String</span><br>
 The timezone that user selected. Check out [Timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
---
- `currency` <span>String</span><br>
 The currency that user selected. Check out [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
---
- `last_connection` <span>Datetime</span><br>
 The last time that user connected to our system. Check out [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).
---
- `private` <span>Boolean</span><br>
 The privacy of user profile.
---
- `avatar` <span>String</span><br>
 The URL of user avatar..

#code

```bash
$ curl --request GET \
  https://api.trader4.net/v1/account
```

::
