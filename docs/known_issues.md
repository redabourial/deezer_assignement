# The workflow for pushing to docker doesn't wait for other workflows to be successful
I'm could figure out how.
# The workflows do not use caching
I didn't have time to implement it.
# Static files are served by django
While not an issue by itself, i am aware that using a CDN is a more appropriate way of serving static files.
But since whitenoise handles compression and caching, the impact is minimal.
# Source maps are added to the container
Source maps are added to the static folder and served by django.
A better way would be to filter source maps and store them as artifacts but that will not be done.
# Antd source maps are broken
When building the following errors will appear:
```
node_modules/antd/es/card/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/app/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/checkbox/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/auto-complete/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/back-top/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
...
```
The build files work fine, beside the fact that exceptions can't be traced in antd.
The [issue has been reported on github](https://github.com/ant-design/ant-design/issues/46273) but i couldn't find a fix.
