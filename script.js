const sectionUl = document.querySelector("section ul");

const getData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('./status_file.txt');
            // console.log('response', response);
            const responseText = await response.text();
            // console.log('responseJson', responseJson);
            resolve(responseText);
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


function handleUi(keysArray, valuesArray ) {
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

        handleUi(Object.keys(data), Object.values(data))
    } catch (error) {
        console.log('error', error);
        
    }
})();

// handle button click
document.querySelector('body').addEventListener('click', function(event) {

    if (event.target.className.toLowerCase() === 'action') {
        console.log(event.target.value);

        let targetBtn = event.target.value
        
        if (targetBtn === 'OP') {
            
            console.log(event.target.textContent)
            
        }

        if (targetBtn === 'UP') {
            
            console.log(targetBtn)
        }
	}
});




