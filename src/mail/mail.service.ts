import got from "got";
import * as FormData from "form-data";
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable() 
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    ){
    }
    async sendEmail(subject:string, template:string,emailVar: EmailVar[]): Promise<Boolean>{
        const form = new FormData();
        form.append("from", `Jayden from Uber Eats <me@${this.options.domain}>`)
        form.append("to", "ckrt4815@gmail.com");
        form.append('subject', subject);
        form.append("template", template);
        emailVar.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
        try{
            await got.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
            headers: {
                Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`,).toString("base64")}`,
                },
            body: form,
                }
            );
            return true;
        } catch(error){
            return false;
        }
    }
    
    sendVerificationEmail(email:string, code:string){
        this.sendEmail("Verify your Email", "verification_template", [
            {key: 'code', value: code}, 
            {key: 'username', value: email }])
    }
}
