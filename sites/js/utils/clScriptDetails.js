function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .info-bar {
            width: 100%;
            background-color: #f2f2f2;
            padding: 10px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
        .info-item {
            display: inline-block;
            margin-left: 20px;
            margin-right: 20px;
        }
    `;
    document.head.appendChild(style);
}

function createInfoItem(label, id) {
    const infoItem = document.createElement('span');
    infoItem.classList.add('info-item');
    const strong = document.createElement('strong');
    strong.textContent = label + ': ';
    infoItem.appendChild(strong);
    const valueSpan = document.createElement('span');
    valueSpan.id = id;
    infoItem.appendChild(valueSpan);
    return infoItem;
}

function createHtmlSkeleton() {
    const infoBar = document.createElement('div');
    infoBar.classList.add('info-bar');
    infoBar.appendChild(createInfoItem('Product', 'product'));
    infoBar.appendChild(createInfoItem('Environment', 'environment'));
    infoBar.appendChild(createInfoItem('Account', 'account'));
    infoBar.appendChild(createInfoItem('Project ID', 'projectID'));
    infoBar.appendChild(createInfoItem('Script Version', 'scriptVersion'));
    document.body.appendChild(infoBar);
}

addStyles();
createHtmlSkeleton();



function waitForConfig() {
    const config = window._clConfig || window._esConfig;
    if (config) {
        console.log("Found config:", config);
        handleConfigData(config);
    } else {
        setTimeout(waitForConfig, 100);
    }
}

function handleConfigData(config) {
    let product = 'Not specified';
    let environment = 'Not specified';
    
    if (config.apiConfig) {
        const apiUrl = config.apiConfig.hostUrl || config.apiConfig.variantDataSourceUrl || '';
        
        if (apiUrl.includes('claspo.io')) {
            product = 'Claspo';
            environment = 'Prod';
        } else if (apiUrl.includes('claspo.tech')) {
            product = 'Claspo';
            environment = 'Stage';
        } else if (apiUrl.includes('esputnik.com')) {
            product = 'eSputnik';
            environment = 'Prod';
        } else if (apiUrl.includes('esstage.com')) {
            product = 'eSputnik';
            environment = 'Stage';
        }
    }
    
    document.getElementById('scriptVersion').textContent = config.version || 'Not specified';
    document.getElementById('product').textContent = product;
    document.getElementById('environment').textContent = environment;
    document.getElementById('account').textContent = config.accountId || config.orgId || 'Not specified';
    document.getElementById('projectID').textContent = config.siteId || config.guid || 'Not specified';
}

waitForConfig();