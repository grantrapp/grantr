#!/bin/bash

function encrypt {
    gpg -e --default-recipient-self --output "$1.gpg" $1
    [[ -f "$1.gpg" ]] && rm $1 && mv "$1.gpg" $1
}
function decrypt {
    mv $1 "$1.gpg"
    gpg --output $1 -f -d "$1.gpg"
    rm "$1.gpg"
}