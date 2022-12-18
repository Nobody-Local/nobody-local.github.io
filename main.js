// これから解析するハッシュのリスト
const passwordHashList = [
    "567f6a4154fa151b11e09f5a69f66abd56a67a12fdac2f776be363368de70a96"
];
  
// 使用する文字のリスト
  // 今回は0-9とa-zのみ
  const characters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];
  
  // 使用するスレッド数。CPUコア数*2 程度にしておく
  // 例えばCore i7なら4*2
  const MAX_THREADS = 12;
  
  // 1スレッドあたり担当する頭文字の数
  // 頭文字で分割することでジョブを均等に分けることができる（はず……）
  // 例えば3スレッドなら「頭文字が0からb」「頭文字がcからn」「頭文字がoからz」
  // で綺麗に分割できる、と思う……
  const LENGTH_PER_THREAD = Math.ceil(characters.length / MAX_THREADS);
  
  // 処理中...と表示
  const indicator = document.createElement('div');
  indicator.innerText = '処理中...';
  document.body.appendChild(indicator);
  
  // MAX_THREADS個のWorkerを起動して計算させる
  for(let i = 0; i < MAX_THREADS; i++) {
    // 頭文字の開始インデックス
    const startCharacterIndex = LENGTH_PER_THREAD * i;
  
    // 頭文字の終了インデックス
    // 次のスレッドのstartIndexと被らないようにするため1を引いておく
    const endIndexTmp = (LENGTH_PER_THREAD * (i + 1)) - 1;
  
    // charactersのlengthを超えてる場合lengthのほうを採用する
    const endCharacterIndex = Math.min(endIndexTmp, characters.length - 1);
  
    // パスワードの最長文字数
    const maxLength = 8;
  
    // Workerを起動してパラメータを投げる
    const worker = new Worker('cracker.js');
    worker.postMessage({
      passwordHashList,
      characters,
      startCharacterIndex,
      endCharacterIndex,
      maxLength
    });
  
    // workerからメッセージが来たらbody要素に表示する
    worker.addEventListener('message', (message) => {
      const div = document.createElement('div');
      div.innerText = `${message.data.hash} -> ${message.data.password}`;
      document.body.appendChild(div);
    });
  }