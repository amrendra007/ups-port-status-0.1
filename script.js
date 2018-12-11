const sectionUl = document.querySelector("section ul");

const getData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('./status_file.txt');
            // console.log('response', response);
            const responseJson = await response.text();
            // console.log('responseJson', responseJson);
            resolve(responseJson);
        } catch (error) {
            reject(error);
        }
    });
};

async function formatData() {
    try {
        const data = await getData();
        const dataArray = data.split('\n').map(item => item.split(' ').filter(Boolean)).reduce((acc, cur) => ([...acc, ...cur]), [])
    
        let  requireData = {};
        for (let i = 0; i < dataArray.length-1; i++) {
            const key = dataArray[i];
            const value = dataArray[i+1];
            if (key && value) {
                requireData[key] = value;
            }
            i = i+1;
        }
        // console.log('requireData', requireData);
        return requireData;
    } catch (error) {
        console.log('error', error);
    }
}

//fn to fetch current user todo list from locl storage and display
function fetchTodos(keysArray, valuesArray ) {
    
    for(let n = 0; n < keysArray.length; n++) {
        let ele = document.createElement("li");
        ele.textContent = keysArray[n].trim();
        let btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "remove");
        const btnText = valuesArray[n].trim() === 'OP' ? 'UNBLOCK' : 'BLOCK'
        btn.setAttribute("value", btnText);
        ele.appendChild(btn);
        sectionUl.appendChild(ele);
    }
}

(async () => {
    try {
        const data  = await formatData();
        console.log('data', data);

        fetchTodos(Object.keys(data), Object.values(data))
    } catch (error) {
        console.log('error', error);
        
    }
})();



