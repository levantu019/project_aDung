# project_aDung
Tìm đường

# Run project (use Docker)
    ```
    docker-compose up
    ```

# Run project (handwork)
- run graphhopper
    ```
    java -Ddw.graphhopper.datareader.file=graphhopper/map1.osm -jar graphhopper/graphhopper-web-5.1.jar server graphhopper/config-example.yml
    ```
- run web
    ```
    cd web
    python manage.py runserver
    ```


# Graphhopper Docker (note)
- This docker image uses the following default environment setting:
    ```
    JAVA_OPTS: "-Xmx1g -Xms1g"
    ```
- For a quick startup you can run the following command to create the andorra routing:
    ```
    docker run -p 8989:8989 israelhikingmap/graphhopper --url https://download.geofabrik.de/europe/andorra-latest.osm.pbf --host 0.0.0.0
    ```
    Then surf to http://localhost:8989/
- You can also completely override the entry point and use this for example:
    ```
    docker run --entrypoint /bin/bash israelhikingmap/graphhopper -c "wget https://download.geofabrik.de/europe/andorra-latest.osm.pbf -O /data/berlin.osm.pbf && java -Ddw.graphhopper.datareader.file=/data/berlin.osm.pbf -Ddw.graphhopper.graph.location=berlin-gh -jar *.jar server config-example.yml"
    ```
    Checkout graphhopper.sh for more usage options such as import.