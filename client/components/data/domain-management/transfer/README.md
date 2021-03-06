TransferData
============

A component that fetches a domain's transfer domain related data (Wapi info) and passes it to its children.

## Usage

Pass a component through the `component` prop of `<TransferData />`. `TransferData` will pass data to the given `component` prop, which is mounted as a child.
It will handle the data itself thus helping us to decouple concerns: i.e. fetching and displaying data. This pattern is also called [container components](https://medium.com/@learnreact/container-components-c0e67432e005).

```js
import React from 'react';
import TransferData from 'components/data/domain-management/transfer';
import MyChildComponent from 'components/my-child-component';

// initialize rest of the variables

class MyComponent extends React.Component {
	render() {
		return (
			<TransferData
				component={ MyChildComponent }
				selectedDomainName={ selectedDomainName } />
		);
	}
}

export default MyComponent;
```

The component expects to receive all listed props:

* `component` - mentioned above
* `selectedDomainName` - the domain name currently selected 

The child component should receive processed props defined during the render:

* `selectedDomainName` - the domain name currently selected 
* `selectedSite` - the site currently selected  

As well as:

* `domains` - a list of domains, it's the result of a call to `DomainsStore.getBySite` for the current site
* `wapiDomainInfo` - Wapi domain info, it's the result of a call to `WapiDomainInfoStore.getByDomainName` for the current domain  

It's updated whenever `DomainsStore`, `WapiDomainInfoStore` changes.
