import { expect } from 'chai';
import { init } from '../src/index';

const locale1 = {
    headers: {
        'plural-forms': 'nplurals=2; plural=(n!=1);',
    },
    translations: {
        '': {
            'test': {
                msgid: 'test',
                msgstr: [
                    'test',
                ],
            },
        },
    },
};

const locale2 = {
    headers: {
        'plural-forms': 'nplurals=2; plural=(n!=1);',
    },
    translations: {
        '': {
            'test': {
                msgid: 'test',
                msgstr: [
                    'test [translation]',
                ],
            },
        },
    },
};

describe('init', () => {
    it('should create a new config every time it is called', () => {
        const ttag1 = init();
        const ttag2 = init();
        {
            const { addLocale, useLocale, t } = ttag1;
            addLocale('locale1', locale1);
            useLocale('locale1');
            expect(t`test`).to.eql('test');
        }
        {
            const { addLocale, useLocale, t } = ttag2;
            addLocale('locale2', locale2);
            useLocale('locale2');
            expect(ttag1.t`test`).to.eql('test');
            expect(t`test`).to.eql('test [translation]');
        }
    });
});
