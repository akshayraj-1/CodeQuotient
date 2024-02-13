const label = document.createElement('label');
function print(data) {
    console.log(data);
    label.innerHTML = '';
    for (var i = 1; i <= data; i++) {
        for (var j = 1; j <= data; j++) {
            label.innerHTML += `${j % 2 ? (i % 2 ? '* ' : '# ') : (i % 2 ? '# ' : '* ')}`;
        }
        label.innerHTML += newLine();
    }

    document.querySelector('.chess-board').appendChild(label);
}

function newLine() {
    return '<br>';
}

var board_size = 8;
print(board_size);

