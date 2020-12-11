# Super experimental Typesense implementation

Only works on Mac for now, but should work other places.

Start typesense with `./typesense-server --config typesense-server.ini` in the typesenseForMac folder.

Then you can generate an index with `yarn search:create` as long as you have previously downloaded parsed .json files for NSR and Bookup.

Fill the index with content with `yarn search:indexSpaces` 
and then you can modifiy the search in searchSpaces.ts while running `yarn search` to get results in console.

