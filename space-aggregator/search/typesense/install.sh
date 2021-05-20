#!/bin/bash

cd ./typesense
 
 if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # ...
				wget https://dl.typesense.org/releases/0.20.0/typesense-server-0.20.0-linux-amd64.tar.gz -O - | tar -xz

elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
				wget https://dl.typesense.org/releases/0.20.0/typesense-server-0.20.0-darwin-amd64.tar.gz  -O - | tar -xz

else
        # Unknown.
				echo "Not on linux or mac, could not auto-install typesense. Try manual install!"
fi