const deepEqual = require('../src/DeepEqual');

describe('deepEqual function tests', () => {

    test('API compare', () => {
        const apiResponse1 = {
            status: 200,
            data: {
                users: [
                    { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['user', 'editor'] },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['admin'] }
                ],
                total: 2,
                page: 1,
                timestamp: new Date('2023-01-01T10:00:00Z')
            }
        };

        const apiResponse2 = {
            status: 200,
            data: {
                users: [
                    { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['user', 'editor'] },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['admin'] }
                ],
                total: 2,
                page: 1,
                timestamp: new Date('2023-01-01T10:00:00Z')
            }
        };

        const apiResponse3 = {
            ...apiResponse1,
            data: {
                ...apiResponse1.data,
                users: [
                    ...apiResponse1.data.users,
                    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', roles: ['user'] }
                ],
                total: 3
            }
        };
        expect(deepEqual(apiResponse1, apiResponse2)).toBe(true)
        expect(deepEqual(apiResponse1, apiResponse3)).toBe(false)
    });

    test('Config compare', () => {
        const config1 = {
            app: {
                name: 'MyApp',
                version: '1.0.0',
                settings: {
                    theme: 'dark',
                    language: 'en',
                    features: {
                        analytics: true,
                        notifications: {
                            email: true,
                            push: false,
                            sms: true
                        },
                        experimental: false
                    }
                },
                database: {
                    host: 'localhost',
                    port: 5432,
                    credentials: {
                        username: 'admin',
                        password: 'secret123'
                    }
                }
            }
        };

        const config2 = JSON.parse(JSON.stringify(config1)); // Deep copy

        const config3 = {
            ...config1,
            app: {
                ...config1.app,
                settings: {
                    ...config1.app.settings,
                    theme: 'light' // Changed theme
                }
            }
        };

        expect(deepEqual(config1, config2)).toBe(true)
        expect(deepEqual(config1, config3)).toBe(false)
    });

    test('Form Data compare', () => {
        const formData1 = {
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                birthDate: new Date('1990-01-01'),
                email: 'john.doe@email.com'
            },
            address: {
                street: '123 Main St',
                city: 'Boston',
                zipCode: '02108',
                country: 'USA'
            },
            preferences: {
                newsletter: true,
                notifications: ['email', 'sms'],
                theme: 'auto'
            }
        };

        const formData2 = {
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                birthDate: new Date('1990-01-01'),
                email: 'john.doe@email.com'
            },
            address: {
                street: '123 Main St',
                city: 'Boston',
                zipCode: '02108',
                country: 'USA'
            },
            preferences: {
                newsletter: true,
                notifications: ['email', 'sms'],
                theme: 'auto'
            }
        };

        const formData3 = {
            ...formData1,
            address: {
                ...formData1.address,
                zipCode: '02109' // Different zip code
            }
        };

        expect(deepEqual(formData1, formData2)).toBe(true)
        expect(deepEqual(formData1, formData3)).toBe(false)
    })

});