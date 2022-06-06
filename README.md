# project_aDung
Tìm đường

# run project
- run graphhopper
    java -Ddw.graphhopper.datareader.file=graphhopper/map1.osm -jar graphhopper/graphhopper-web-5.1.jar server graphhopper/config-example.yml
- run web
    cd web
    python manage.py runserver