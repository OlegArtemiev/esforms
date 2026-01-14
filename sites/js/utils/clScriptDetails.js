function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .info-bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            width: 100vw;
            max-width: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 8px 18px;
            margin: 0;
            padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
            box-sizing: border-box;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            font-size: 12px;
            color: #0f172a;
            background: linear-gradient(90deg, rgba(255, 247, 237, 0.95), rgba(240, 253, 250, 0.95));
            border-top: 1px solid rgba(15, 23, 42, 0.12);
            box-shadow: 0 -12px 24px rgba(15, 23, 42, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 0;
        }
        .info-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.06);
        }
        .info-item strong {
            font-weight: 600;
        }
        .info-item > span {
            color: #475569;
        }
        @media (max-width: 640px) {
            .info-bar {
                font-size: 11px;
                gap: 6px 12px;
                padding: 8px 12px;
            }
            .info-item {
                padding: 3px 8px;
            }
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
