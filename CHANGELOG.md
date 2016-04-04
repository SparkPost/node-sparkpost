## Change Log

### v1.3.1 (2016/04/01)
- [#130](https://github.com/SparkPost/node-sparkpost/pull/130) Refactored toApiFormat.js to use json-pointer (@orval)

### v1.3.0 (2016/04/01)
- [#129](https://github.com/SparkPost/node-sparkpost/pull/129) Added support for subaccounts (@coldacid)
- [#126](https://github.com/SparkPost/node-sparkpost/pull/126) body might be undefined (@mstdokumaci)
- [#121](https://github.com/SparkPost/node-sparkpost/pull/121) Added support for Relay Webhooks (@aydrian)
- [#119](https://github.com/SparkPost/node-sparkpost/pull/119) Added support for inbound domains (@aydrian)
- [#118](https://github.com/SparkPost/node-sparkpost/pull/118) Added support for deleting a sending domain (@aydrian)
- [#115](https://github.com/SparkPost/node-sparkpost/pull/115) ReadMe "Hello World" Example (@JimTheMan)

### v1.2.0 (2016/03/14)
- [#109](https://github.com/SparkPost/node-sparkpost/pull/109) README updates (@aydrian)
- [#108](https://github.com/SparkPost/node-sparkpost/pull/108) removes from and subject from transmission stored template send example (@colestrode)
- [#106](https://github.com/SparkPost/node-sparkpost/pull/106) correcting send_transmission_all_fields.js example (@lfreneda)
- [#104](https://github.com/SparkPost/node-sparkpost/pull/104) Added a mocha test task to the default grunt task (@ewandennis)
- [#101](https://github.com/SparkPost/node-sparkpost/pull/101) Added gzipped response support (@ewandennis)
- [#100](https://github.com/SparkPost/node-sparkpost/pull/100) Added message events wrapper (@ewandennis)
- [#97](https://github.com/SparkPost/node-sparkpost/pull/97) Add nodejs versions to TravisCI (@richleland)

### v1.1.0 (2015/08/13)
- [#92](https://github.com/SparkPost/node-sparkpost/pull/92) Added Coveralls.io (@aydrian)
- [#91](https://github.com/SparkPost/node-sparkpost/pull/91) Added Recipient List Update method, Docs, and Examples (@aydrian)
- [#85](https://github.com/SparkPost/node-sparkpost/pull/85) Added getDocumentation and getSamples functions to Webhooks resource (@aydrian)

### v1.0.1 (2015/08/06)
- [#88](https://github.com/SparkPost/node-sparkpost/pull/88) Modified toApiFormat spec test file to fit standard naming convention. Added tests for code coverage. (@aydrian)
- [#87](https://github.com/SparkPost/node-sparkpost/pull/87) Removed dependency for snake-case (@aydrian)
- [#83](https://github.com/SparkPost/node-sparkpost/pull/83) Make sure to support sending with a stored recipient list or template, while also leaving headers and substitution data alone. (@bdeanindy)
- [#80](https://github.com/SparkPost/node-sparkpost/pull/80) Updated transmission docs and examples. (@aydrian)
- [#78](https://github.com/SparkPost/node-sparkpost/pull/78) Update Sending Domains docs and examples. (@aydrian)
- [#70](https://github.com/SparkPost/node-sparkpost/pull/70) Update examples for newly added toApiFormat (@bdeanindy)

### v1.0.0 (2015/06/06) - *breaking*
- [#68](https://github.com/SparkPost/node-sparkpost/pull/68) Added keywords for searching in npm (@nornholdj)
- [#67](https://github.com/SparkPost/node-sparkpost/pull/67) Created a change log as CHANGELOG.md (@aydrian)
- [#66](https://github.com/SparkPost/node-sparkpost/pull/66) Issue [#51](https://github.com/SparkPost/node-sparkpost/issues/51) Modify the base object to handle non 2XX status and simplify second callback param (@aydrian)
- [#56](https://github.com/SparkPost/node-sparkpost/pull/56) Issue [#46](https://github.com/SparkPost/node-sparkpost/issues/46) Updates to Transmissions library (@aydrian)
- [#55](https://github.com/SparkPost/node-sparkpost/pull/55) Fix doc about using process.env.SPARKPOST_API_KEY (@bizob2828)
- [#54](https://github.com/SparkPost/node-sparkpost/pull/54) fixed link to transmissions in readme (@bizob2828)
- [#45](https://github.com/SparkPost/node-sparkpost/pull/45) Issue [#45](https://github.com/SparkPost/node-sparkpost/issues/44) Accept camelCase or native API format seamlessly (@bdeanindy)
  - Issue [#64](https://github.com/SparkPost/node-sparkpost/issues/64) Update webhooks to use toApiFormat
  - Issue [#63](https://github.com/SparkPost/node-sparkpost/issues/63) Updated suppressionlists to use toApiFormat
  - Issue [#61](https://github.com/SparkPost/node-sparkpost/issues/61) Update sending domains to use toApiFormat
  - Issue [#60](https://github.com/SparkPost/node-sparkpost/issues/60) Update templates to use toApiFormat
  - Issue [#58](https://github.com/SparkPost/node-sparkpost/issues/58) Update recipientLists to use toApiFormat
  - Issue [#57](https://github.com/SparkPost/node-sparkpost/issues/58) Update transmissions to use toApiFormat

### v0.9.0 (2015/05/12) - *breaking*
- [#49](https://github.com/SparkPost/node-sparkpost/pull/49) Issue [#48](https://github.com/SparkPost/node-sparkpost/issues/48) Add Grunt Bump (@aydrian)
- [#47](https://github.com/SparkPost/node-sparkpost/pull/47) Issue [#44](https://github.com/SparkPost/node-sparkpost/issues/44) Create docs and examples for new APIs (@aydrian)
- [#43](https://github.com/SparkPost/node-sparkpost/pull/43) Issue [#42](https://github.com/SparkPost/node-sparkpost/issues/42) Modified sendingDomains.verify and updated the unit tests and examples.(@aydrian)
- [#41](https://github.com/SparkPost/node-sparkpost/pull/41) Issue [#40](https://github.com/SparkPost/node-sparkpost/issues/40) sparkpost.js test cleanup (@aydrian)
- [#39](https://github.com/SparkPost/node-sparkpost/pull/39) Issue [#38](https://github.com/SparkPost/node-sparkpost/issues/38) Updated Sending Domains unit tests. Added error checking. (@aydrian)
- [#34](https://github.com/SparkPost/node-sparkpost/pull/34) Issue [#33](https://github.com/SparkPost/node-sparkpost/issues/33) made transmission unit tests more unity (@colestrode)
- [#32](https://github.com/SparkPost/node-sparkpost/pull/32) Issue [#10](https://github.com/SparkPost/node-sparkpost/issues/10) Webhooks API (@aydrian)
- [#31](https://github.com/SparkPost/node-sparkpost/pull/31) Issue [#6](https://github.com/SparkPost/node-sparkpost/issues/6) Templates SDK (@aydrian)
- [#30](https://github.com/SparkPost/node-sparkpost/pull/30) Issue [#20](https://github.com/SparkPost/node-sparkpost/issues/20) Suppression List SDK (@aydrian)
- [#29](https://github.com/SparkPost/node-sparkpost/pull/29) Issue [#7](https://github.com/SparkPost/node-sparkpost/issues/7) Recipient Lists SDK (@aydrian)
- [#27](https://github.com/SparkPost/node-sparkpost/pull/27) Issue [#16](https://github.com/SparkPost/node-sparkpost/issues/16) Adding a base object (@aydrian)

### v0.1.6 (2015/04/16)
- [#26](https://github.com/SparkPost/node-sparkpost/pull/26) removed defaulting open/click tracking to true (@jmartin4563)

### v0.1.5 (2015/04/02)
- [#22](https://github.com/SparkPost/node-sparkpost/pull/22) Apply fix for [#21](https://github.com/SparkPost/node-sparkpost/issues/21) and add appropriate unit test / update mock (@jmartin4563)

### v0.1.4 (2015/02/24)
- Sending Domains Functionality and Transmissions Sandbox Option

### v0.1.3 (2015/01/08)
- Open & Click Tracking Disabling Bug Fix

### v0.1.2 (2014/12/10)
- Added SendGrid compatibility layer

### v0.1.1 (2014/12/10)
- Added SendGrid compatibility layer

### v0.1.0 (2014/11/10)
- First Release!
