#!/bin/bash
app_www=app/www

if [ -d $app_www ]; then
  rm -rf $app_www
fi

cp -r client $app_www
cp -r app_res/ $app_www