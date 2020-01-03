import { track, LightningElement } from 'lwc';
import getLookups from '@salesforce/apex/LookupRollupSummaryLtngController.getLookups'

export default class Managelookuprollupsummary extends LightningElement {

    @track lookups = []
    @track objectCount = []
    @track totals = 0
    @track active = 0
    @track inactive = 0
    @track loading = true

    loadLookups() {
        getLookups().then(res => {
            this.lookups = res

            if (res !== undefined && Array.isArray(res)) {
                this.totals = res.length
                this.active = res.filter(el => {
                    return el.Record.Active__c
                }).length
                this.inactive = res.filter(el => {
                    return !el.Record.Active__c
                }).length
            }
        }).catch(err => {
            if (Array.isArray(err)) {
                this.errors = err
            } else {
                this.errors = [err]
            }
        }).finally(() => {
            this.loading = false
        })
    }

    searchByString(evt) {
    }

    connectedCallback() {
        this.loadLookups()
    }
}