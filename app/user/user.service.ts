import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';  // URL to web api
    constructor(private http: Http) { }
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }
    save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }
    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }
    // Add new Hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'});
        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}




/*
 getTestInfo (): Promise<testInfo[]> {
 return this.http.get(this.testInfoUrl)
 .toPromise()
 .then(this.extractData)
 .catch(this.handleError);
 }
 addTestInfo (name: string): Promise<testInfo> {
 let body = JSON.stringify({ name });
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.heroesUrl, body, options)
 .toPromise()
 .then(this.extractData)
 .catch(this.handleError);
 }
 private extractData(res: Response) {
 let body = res.json();
 return body.data || { };
 }
 private handleError (error: any) {
 // In a real world app, we might use a remote logging infrastructure
 // We'd also dig deeper into the error to get a better message
 let errMsg = (error.message) ? error.message :
 error.status ? `${error.status} - ${error.statusText}` : 'Server error';
 console.error(errMsg); // log to console instead
 return Promise.reject(errMsg);
 }

 */


/*
 getHeroes (): Promise<Hero[]> {
 return this.http.get(this.heroesUrl)
 .toPromise()
 .then(this.extractData)
 .catch(this.handleError);
 }
 addHero (name: string): Promise<Hero> {
 let body = JSON.stringify({ name });
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.heroesUrl, body, options)
 .toPromise()
 .then(this.extractData)
 .catch(this.handleError);
 }
 private extractData(res: Response) {
 let body = res.json();
 return body.data || { };
 }
 private handleError (error: any) {
 // In a real world app, we might use a remote logging infrastructure
 // We'd also dig deeper into the error to get a better message
 let errMsg = (error.message) ? error.message :
 error.status ? `${error.status} - ${error.statusText}` : 'Server error';
 console.error(errMsg); // log to console instead
 return Promise.reject(errMsg);
 }

 */