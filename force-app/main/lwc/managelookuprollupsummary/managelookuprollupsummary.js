import { track, LightningElement } from 'lwc';
import getLookups from '@salesforce/apex/LookupRollupSummaryLtngController.getLookups'

export default class Managelookuprollupsummary extends LightningElement {

    @track lookups = []

    loadLookups() {
        getLookups().then(res => {
            this.lookups = res
            console.log(JSON.parse(JSON.stringify(this.lookups)))
        }).catch(err => {
            if (Array.isArray(err)) {
                this.errors = err
            } else {
                this.errors = [err]
            }
        })
    }

    searchByString(evt) {
        console.log('searching for ' + evt.target.value)
    }

    connectedCallback() {
        this.loadLookups()
    }
}